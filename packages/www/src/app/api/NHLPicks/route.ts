
import { NHLBracketPicksSchema, NHLPicksQuerySchema } from '@/schemas/nhlpicks.schema'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import * as services from '@/services/nhlpicks.service'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { getUserId } from '@/services/users.service'
import { getActiveRound, getActiveSeason, getActiveSeries } from '@/services/nhlseries.service'
import { playoffSeriesHaveNotStarted, validPlayoffRounds, validPlayoffSeasons } from '@/utils/playoffs'
import { ZodError } from 'zod'

export async function GET(req: NextRequest){
  try {
    const searchParams = Object.fromEntries(
      new URLSearchParams(req.nextUrl.searchParams)
    )
    const query = NHLPicksQuerySchema.parse(searchParams)
    const data = await services.getNhlBracketPicks(query)
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        picks: data
      }
    }, {
      status: StatusCodes.OK,
      statusText: getReasonPhrase(StatusCodes.OK)
    })
  } catch(err: any){
    if (err instanceof ZodError) {
		return NextResponse.json(
			{
				message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				status: StatusCodes.BAD_REQUEST,
				errors: err.issues.map((e) => ({
					path: e.path[0],
					message: e.message,
				})),
			},
			{
				status: StatusCodes.BAD_REQUEST,
				statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
			}
		)
	}
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}

export async function POST(req: NextRequest){
  try {
    const { picks } = await req.json()
    const { userId } = getAuth(req)
    if (!userId){
      return NextResponse.json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        status: StatusCodes.UNAUTHORIZED
      }, {
        status: StatusCodes.UNAUTHORIZED,
        statusText: getReasonPhrase(StatusCodes.UNAUTHORIZED)
      })
    }
    const id = await getUserId(userId)
    if (!id){
      return NextResponse.json(
			{
				message: getReasonPhrase(StatusCodes.NOT_FOUND),
				status: StatusCodes.NOT_FOUND,
			},
			{
				status: StatusCodes.NOT_FOUND,
				statusText: getReasonPhrase(StatusCodes.NOT_FOUND),
			}
		)}
    const input = NHLBracketPicksSchema.parse(picks)
    const season = await getActiveSeason()
    const round = await getActiveRound(season?.season)
    const validRounds = validPlayoffRounds({ picksDto: input, round: round?.round })
    const validSeasons = validPlayoffSeasons({
			picksDto: input,
			season: season?.season,
		})
    if (!validRounds || !validSeasons) {
      return NextResponse.json(
			{
				message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				status: StatusCodes.BAD_REQUEST,
			},
			{
				status: StatusCodes.BAD_REQUEST,
				statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
			})
    }
    const activeSeries = await getActiveSeries({
      round: round!.round,
      season: season!.season,
    })
    const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
    if (!seriesNotStarted) {
      return NextResponse.json(
			{
				message: getReasonPhrase(StatusCodes.BAD_REQUEST),
				status: StatusCodes.BAD_REQUEST,
				errors: 'Series have already started.',
			},
			{
				status: StatusCodes.BAD_REQUEST,
				statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
			}
		)}
    await services.createNhlBracketPicks(input, id.id)
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.CREATED),
      status: StatusCodes.CREATED
    }, {
      status: StatusCodes.CREATED,
      statusText: getReasonPhrase(StatusCodes.CREATED)
    })
  } catch (err: any){
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          message: getReasonPhrase(StatusCodes.BAD_REQUEST),
          status: StatusCodes.BAD_REQUEST,
          errors: err.issues.map((e) => ({
            path: e.path[0],
            message: e.message,
          })),
        },
        {
          status: StatusCodes.BAD_REQUEST,
          statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
        }
      )
    }
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}
