import { Node, XYPosition } from 'reactflow'
import { v4 as uuid } from 'uuid'
import { IPlayoff, IPlayoffMatchupTeam } from '@backend/types/playoffs'
import PlayoffBrackets from '../config/playoff_brackets.json'
import { NhlTeam, NhlSeries } from '@prisma/client'


type NHL_PLAYOFF_ROUND = 1 | 2 | 3 | 4 | 5

export function NHLSeriesByPlayoffRound(
  data: IPlayoff,
  round: NHL_PLAYOFF_ROUND
){
  const NHL_PLAYOFF_ROUND_INDEX = round - 1
  if (!data.rounds) return []
  if (!(NHL_PLAYOFF_ROUND_INDEX in data.rounds)) return []
  return data.rounds[NHL_PLAYOFF_ROUND_INDEX].series
}

export function NHLSeriesNodes({
  data
}: {
  data: IPlayoff
}){
  const round1Series = NHLSeriesByPlayoffRound(data, 1)
  const round2Series = NHLSeriesByPlayoffRound(data, 2)
  const round3Series = NHLSeriesByPlayoffRound(data, 3)
  const round4Series = NHLSeriesByPlayoffRound(data, 4)

  const round1SeriesNodes = round1Series.map((series, seriesIndex) => {
    const seriesNode: Node = {
      id: uuid(),
      data: {
        ...series,
      },
      type: 'seriesNode',
      position: PlayoffBrackets.brackets.NHL.rounds['1'][seriesIndex].position
    }
    return seriesNode
  })

  const round2SeriesNodes = round2Series.map((series, seriesIndex) => {
    const seriesNode: Node = {
      id: uuid(),
      data: {
        ...series,
      },
      type: 'seriesNode',
      position: PlayoffBrackets.brackets.NHL.rounds['2'][seriesIndex].position
    }
    return seriesNode
  })

  const round3SeriesNodes = round3Series.map((series, seriesIndex) => {
    const seriesNode: Node = {
      id: uuid(),
      data: {
        ...series,
      },
      type: 'seriesNode',
      position: PlayoffBrackets.brackets.NHL.rounds['3'][seriesIndex].position
    }
    return seriesNode
  })

  const round4SeriesNodes = round4Series.map((series, seriesIndex) => {
    const seriesNode: Node = {
      id: uuid(),
      data: {
        ...series,
      },
      type: 'finalsNode',
      position: PlayoffBrackets.brackets.NHL.rounds['4'][seriesIndex].position
    }
    return seriesNode
  })

  const round5SeriesNodes = [{
    id: uuid(),
    data: {},
    type: 'seriesNode',
    position: PlayoffBrackets.brackets.NHL.rounds['5'][0].position
  }]

  return [
    ...round1SeriesNodes,
    ...round2SeriesNodes,
    ...round3SeriesNodes,
    ...round4SeriesNodes,
  ]
}

export const validPlayoffRounds = ({
	picksDto,
	round,
}: {
	picksDto: {
		teamId: number
		round: number
		season: string
		seriesCode: string
	}[]
	round: number | undefined
}) => {
	if (!round) return false
	return picksDto.every((pick) => pick.round === round)
}

export const validPlayoffSeasons = ({
	picksDto,
	season,
}: {
	picksDto: {
		teamId: number
		round: number
		season: string
		seriesCode: string
	}[]
	season: string | undefined
}) => {
	if (!season) return false
	return picksDto.every((pick) => pick.season === season)
}

export const playoffSeriesHaveNotStarted = (
	series: (NhlSeries & {
		teams: {
			team: NhlTeam | null
		}[]
	})[]
) =>
	series.every(
		(series) =>
			series.gameNumber === 1 &&
			series.gameTime &&
			series.gameTime > new Date()
	)
