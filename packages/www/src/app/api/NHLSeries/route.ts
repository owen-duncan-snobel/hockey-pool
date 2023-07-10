import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import * as series from '@/services/nhlseries.service'
import { NhlSeriesQuerySchema } from "@/schemas/nhlseries.schema";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
	try {
    const searchParams = Object.fromEntries(
      new URLSearchParams(req.nextUrl.searchParams)
    )
    const query = NhlSeriesQuerySchema.parse(searchParams)
		const data = await series.getSeries({ ...query })
    return NextResponse.json({
      message: getReasonPhrase(StatusCodes.OK),
      status: StatusCodes.OK,
      data: {
        series: data
      }
    })
	} catch (err: any) {
    console.log(err)
    if (err instanceof ZodError){
      return NextResponse.json({
        message: getReasonPhrase(StatusCodes.BAD_REQUEST),
        status: StatusCodes.BAD_REQUEST,
        errors: err.issues.map((e) => ({
          path: e.path[0],
          message: e.message,
        })),
      }, {
        status: StatusCodes.BAD_REQUEST,
        statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
      })
    }
		return NextResponse.json({
			message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			status: StatusCodes.INTERNAL_SERVER_ERROR,
		})
	}
}

