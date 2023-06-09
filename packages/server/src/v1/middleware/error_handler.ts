import { NextFunction, Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { z } from 'zod'
import HttpException from '../../exceptions/http-exception'

const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof z.ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      status: StatusCodes.BAD_REQUEST,
      errors: err.issues.map((e) => ({ path: e.path[0], message: e.message })),
    })
  } if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
      case 'P2003':
      case 'P2004':
      case 'P2005':
        return res.status(StatusCodes.CONFLICT).json({
          message: getReasonPhrase(StatusCodes.CONFLICT),
          status: StatusCodes.CONFLICT,
        })
      default:
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
  } else if (err instanceof PrismaClientValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      status: StatusCodes.BAD_REQUEST,
    })
  } else if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message,
      status: err.status,
    })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  })
}

export default ErrorHandler
