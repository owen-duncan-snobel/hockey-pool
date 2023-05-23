import { NhlSeries, NhlTeam } from "@prisma/client"

export const validPlayoffRounds = ({picksDto, round} : {
  picksDto: {
    teamId: number,
    round: number,
    season: string,
    seriesCode: string
  }[],
  round: number | undefined
}) => {
  if (!round) return false
  return picksDto.every(pick => pick.round === round)
}

export const validPlayoffSeasons = ({picksDto, season} : {
  picksDto: {
    teamId: number,
    round: number,
    season: string,
    seriesCode: string
  }[],
  season: string | undefined
}) => {
  if (!season) return false
  return picksDto.every(pick => pick.season === season)
}

export const playoffSeriesHaveNotStarted = (series: (NhlSeries & {
  teams: {
    team: NhlTeam | null;
  }[]
})[]) => {
  return series.every(series => series.gameNumber === 1 
    && series.gameTime
    && series.gameTime > new Date())
}