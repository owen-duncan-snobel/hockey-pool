import { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as services from '../services/nhlpicks.service'
import { getUser } from './users.controller'
import { NHLBracketPicksSchema } from '../schemas/nhlpicks.schema'
import { getUserId } from '../services/users.service'
import { WithAuthProp } from '@clerk/clerk-sdk-node'

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