import { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as services from '../services/nhlpicks.service'
import { NHLBracketPicksSchema } from '../schemas/nhlpicks.schema'

export async function createNhlBracketPick(req: Request, res: Response, next: NextFunction){
  try {
    const input = NHLBracketPicksSchema.parse(req.body)
    await services.createNhlBracketPick(input)
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