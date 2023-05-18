import { NextFunction, Request, Response } from 'express'
import * as brackets from '../services/brackets.service'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import redis from '../../libs/redis/redis'


export async function getBrackets(req: Request, res: Response, next: NextFunction){
  try {
    const cachedBrackets = await redis.get('brackets')
		if (cachedBrackets) {
      return res.status(StatusCodes.OK).json({
        message: getReasonPhrase(StatusCodes.OK),
        status: StatusCodes.OK,
        data: {
          brackets: JSON.parse(cachedBrackets)
        }
      })
    }

    const data = await brackets.getBrackets()
    res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        brackets: data,
      }
    })
    return await redis.set('brackets', JSON.stringify(data), {
      EX: 3600
    })
  } catch (err){
    next(err)
    return
  }
}