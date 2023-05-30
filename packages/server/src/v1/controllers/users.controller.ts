import { NextFunction, Request, Response } from 'express'
import {
  WithAuthProp,
} from '@clerk/clerk-sdk-node'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import * as services from '../services/users.service'

export async function getUser(req: WithAuthProp<Request>, res: Response, next: NextFunction) {
  try {
    const { auth } = req
    if (!auth.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        status: StatusCodes.UNAUTHORIZED,
      })
    }
    const user = await services.getUser(auth.userId)
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: getReasonPhrase(StatusCodes.NOT_FOUND),
        status: StatusCodes.NOT_FOUND,
      })
    }
    return res.status(StatusCodes.OK).json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        user,
      },
    })
  } catch (err) {
    next(err)
  }
}
