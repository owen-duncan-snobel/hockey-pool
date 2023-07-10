import { StatusCodes, getReasonPhrase } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from '@clerk/nextjs/server'
import redis from "@/libs/ioredis/redis"
import * as services from '@/services/nhlstandings.service'

export async function GET(req: NextRequest){
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return NextResponse.json(
        {
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
          status: StatusCodes.UNAUTHORIZED,
        },
        {
          status: StatusCodes.UNAUTHORIZED,
          statusText: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        }
      )
    }
    const cachedStandings = await redis.get('standings')
    if (cachedStandings) {
      return NextResponse.json(
        {
          message: getReasonPhrase(StatusCodes.OK),
          status: StatusCodes.OK,
          data: {
            standings: JSON.parse(cachedStandings)
          }
        },
        {
          status: StatusCodes.OK,
          statusText: getReasonPhrase(StatusCodes.OK),
        }
      )
    }
    const standings = await services.getCurrentSeasonPlayoffStandingsForAllUsers()
    await redis.set('standings', JSON.stringify(standings), 'EX', 60 * 60)
    return NextResponse.json(
      {
        message: getReasonPhrase(StatusCodes.OK),
        status: StatusCodes.OK,
        data: {
          brackets: standings,
        },
      },
      {
        status: StatusCodes.OK,
      }
    )
  } catch (err: any){
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}
