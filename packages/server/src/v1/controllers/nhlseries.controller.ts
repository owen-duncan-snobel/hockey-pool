import express, { NextFunction, Request, Response } from 'express'
import * as series from '../services/nhlseries.service'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NhlSeriesQuerySchema } from '../schemas/nhlseries.schema'

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
    return
  }
}

export async function getActiveSeries(req: Request, res: Response, next: NextFunction) {
  try {
    const currentSeason = await series.getActiveSeason()
    const currentRound = await series.getActiveRound(currentSeason?.season)
    const activeSeries = await series.getActiveSeries({
      round: currentRound?.round || 1,
      season: currentSeason?.season || '20222023'
    })
    return res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        series: activeSeries,
      }
    })
  } catch(err){
    next(err)
    return
  }
} 