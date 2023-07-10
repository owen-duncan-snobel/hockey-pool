import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'
import * as series from '@/services/nhlseries.service'
import { playoffSeriesHaveNotStarted } from '@/utils/playoffs'

export async function GET(req: NextRequest) {
	try {
    const currentSeason = await series.getActiveSeason()
    const currentRound = await series.getActiveRound(currentSeason?.season)
    const activeSeries = await series.getActiveSeries({
      round: currentRound?.round || 1,
      season: currentSeason?.season || '20222023',
    })
    const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
		return NextResponse.json({
			message: getReasonPhrase(StatusCodes.OK),
			status: StatusCodes.OK,
			data: {
				series: activeSeries,
        seriesStarted: !seriesNotStarted
			},
		})
	} catch (err: any) {
		console.log(err)
		return NextResponse.json({
			message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			status: StatusCodes.INTERNAL_SERVER_ERROR,
		})
	}
}
