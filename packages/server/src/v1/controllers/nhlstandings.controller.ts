import { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as services from '../services/nhlstandings.service'
import redis from '../../libs/ioredis/redis'

export const getCurrentSeasonPlayoffStandings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.auth
    if (!auth || !auth.userId) return res.status(StatusCodes.UNAUTHORIZED).json({
      message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      status: StatusCodes.UNAUTHORIZED
    })
    const cachedStandings = await redis.get('standings')
    if (cachedStandings) {
      return res.status(StatusCodes.OK).json({
        message: getReasonPhrase(StatusCodes.OK),
        status: StatusCodes.OK,
        data: {
          standings: JSON.parse(cachedStandings),
        },
      })
    }
    
    const standings = await services.getCurrentSeasonPlayoffStandingsForAllUsers()
    res.status(200).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        standings: standings,
      },
    })
    return await redis.set('standings', JSON.stringify(standings), 'EX', 60 * 60 * 12)
  } catch (err) {
    next(err)
    return
  }
}