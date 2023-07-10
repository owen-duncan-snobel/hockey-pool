
import { NHLPicksQuerySchema } from '@/schemas/nhlpicks.schema'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import * as services from '@/services/nhlpicks.service'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export async function GET(req: NextRequest){
  try {
    const data = await services.getNhlBracketPicks()
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        picks: data
      }
    }, {
      status: StatusCodes.OK,
      statusText: getReasonPhrase(StatusCodes.OK)
    })
  } catch(err: any){
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}

export async function POST(req: NextRequest){
  try {
    const { userId } = getAuth(req)
    const
  } catch (err: any){

  }
}
