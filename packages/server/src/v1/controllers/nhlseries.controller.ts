import express, { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as series from '../services/nhlseries.service'
import { NhlSeriesQuerySchema } from '../schemas/nhlseries.schema'
import { playoffSeriesHaveNotStarted } from '../../utils/playoffs'

export async function getSeries(req: Request, res: Response, next: NextFunction) {
  try {
    const input = NhlSeriesQuerySchema.parse({
      query: req.query,
    })
    const data = await series.getSeries({ ...input.query })
    return res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        series: data,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function getActiveSeries(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentSeason = await series.getActiveSeason()
    const currentRound = await series.getActiveRound(currentSeason?.season)
    const activeSeries = await series.getActiveSeries({
      round: currentRound?.round || 1,
      season: currentSeason?.season || '20222023',
    })
    const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
    return res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        series: activeSeries,
        seriesStarted: !seriesNotStarted,
      },
    })
  } catch (err) {
    next(err)
  }
}
