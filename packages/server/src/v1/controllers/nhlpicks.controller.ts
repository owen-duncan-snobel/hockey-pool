import { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as services from '../services/nhlpicks.service'
import { NHLBracketPicksSchema, NHLPicksQuerySchema } from '../schemas/nhlpicks.schema'
import { getUserId } from '../services/users.service'
import { getActiveRound, getActiveSeason, getActiveSeries } from '../services/nhlseries.service'
import { playoffSeriesHaveNotStarted, validPlayoffRounds, validPlayoffSeasons } from '../../utils/playoffs'

export async function getNhlBracketPicks(req: Request, res: Response, next: NextFunction) {
  try {
    const { auth } = req
    if (!auth || !auth.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        status: StatusCodes.UNAUTHORIZED,
      })
    }
    const query = NHLPicksQuerySchema.parse(req.query)
    const data = await services.getNhlBracketPicks(query)
    return res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        picks: data,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function createNhlBracketPicks(req: Request, res: Response, next: NextFunction) {
  try {
    const { picks } = req.body
    const { auth } = req
    if (!auth || !auth.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        status: StatusCodes.UNAUTHORIZED,
      })
    }
    const userId = await getUserId(auth.userId)
    if (!userId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: getReasonPhrase(StatusCodes.NOT_FOUND),
        status: StatusCodes.NOT_FOUND,
      })
    }
    const input = NHLBracketPicksSchema.parse(picks)
    const season = await getActiveSeason()
    const round = await getActiveRound(season?.season)
    const validRounds = validPlayoffRounds({ picksDto: input, round: round?.round })
    const validSeasons = validPlayoffSeasons({ picksDto: input, season: season?.season })
    if (!validRounds || !validSeasons) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: getReasonPhrase(StatusCodes.BAD_REQUEST),
        status: StatusCodes.BAD_REQUEST,
      })
    }
    const activeSeries = await getActiveSeries({
      round: round!.round,
      season: season!.season,
    })
    const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
    if (!seriesNotStarted) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: getReasonPhrase(StatusCodes.BAD_REQUEST),
        status: StatusCodes.BAD_REQUEST,
        errors: 'Series have already started.',
      })
    }
    await services.createNhlBracketPicks(input, userId.id)
    return res.status(201).json({
      message: getReasonPhrase(StatusCodes.CREATED),
      status: StatusCodes.CREATED,
    })
  } catch (err) {
    next(err)
  }
}
