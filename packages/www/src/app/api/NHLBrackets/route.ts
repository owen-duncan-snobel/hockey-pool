import { NextResponse } from "next/server"
import redis from '@/libs/ioredis/redis'
import { StatusCodes, getReasonPhrase } from "http-status-codes"
import * as services from '@/services/nhlbrackets.service'

export async function GET(){
  try {
    const cachedBrackets = await redis.get('brackets')
    if (cachedBrackets) {
      return NextResponse.json({
        message: getReasonPhrase(StatusCodes.OK),
        status: StatusCodes.OK,
        data: {
          brackets: JSON.parse(cachedBrackets),
        },
      }, {
        status: StatusCodes.OK
      })
    }

    const data = await services.getNhlBrackets()
    await redis.set('brackets', JSON.stringify(data), 'EX', 60 * 60)
    return NextResponse.json(
      {
        message: getReasonPhrase(StatusCodes.OK),
        status: StatusCodes.OK,
        data: {
          brackets: data,
        },
      },
      {
        status: StatusCodes.OK,
      }
    )
  } catch (err: any){
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      status: StatusCodes.INTERNAL_SERVER_ERROR
    }, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    })
  }
}
