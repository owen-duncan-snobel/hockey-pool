import { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as services from '../services/nhlpicks.service'
import { NHLBracketPicksSchema } from '../schemas/nhlpicks.schema'
import { getUserId } from '../services/users.service'
import { getActiveRound, getActiveSeason, getActiveSeries } from '../services/nhlseries.service'

export async function getNhlBracketPicks(req: Request, res: Response, next: NextFunction){
  try {
    const data = await services.getNhlBracketPicks()
    return res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        picks: data
      }
    })
  } catch (err){
    next(err)
    return
  }
}

export async function createNhlBracketPicks(req: Request, res: Response, next: NextFunction){
  try {
    const { picks } = req.body
    const auth = req.auth
    if (!auth || !auth.userId) return res.status(StatusCodes.UNAUTHORIZED).json({
      message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      status: StatusCodes.UNAUTHORIZED
    })
    const userId = await getUserId(auth.userId)
    if (!userId) return res.status(StatusCodes.NOT_FOUND).json({
      message: getReasonPhrase(StatusCodes.NOT_FOUND),
      status: StatusCodes.NOT_FOUND
    })
    const input = NHLBracketPicksSchema.parse(picks)
    const season = await getActiveSeason()
    const round = await getActiveRound(season?.season)
    // check that the round has not started yet (
    // aka. all game numbers are 1 and the start date for each series is in the future)
    const validRounds = input.every(pick => pick.round === round?.round)
    const validSeaons = input.every(pick => pick.season === season?.season)
    if (!validRounds || !validSeaons) return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      status: StatusCodes.BAD_REQUEST
    })
    const activeSeries = await getActiveSeries({
      round: round!.round,
      season: season!.season
    })
    const seriesHaveNotStarted = activeSeries.every(series => series.gameNumber === 1 
      && series.gameTime
      && series.gameTime > new Date())

    if (!seriesHaveNotStarted) return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      status: StatusCodes.BAD_REQUEST,
      errors: "Series have already started."
    })

    await services.createNhlBracketPicks(input, userId.id)
    return res.status(201).json({
      message: getReasonPhrase(StatusCodes.CREATED),
      status: StatusCodes.CREATED
    })
  }
  catch (err){
    next(err)
    return
  }
}