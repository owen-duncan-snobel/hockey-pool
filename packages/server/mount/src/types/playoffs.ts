export interface IPlayoff {
  id: number
  name: string
  season: string
  defaultRound: number
  rounds: IPlayoffRound[]
}

export interface IPlayoffRound {
  number: number
  code: number
  names: {
    name: string
    shortName: string
  }
  format: IRoundFormat
  series: IPlayoffSeries[]
}

export interface IRoundFormat {
  name: string
  description: string
  numberOfGames: number
  numberOfWins: number
}

export interface IPlayoffSeries {
  seriesNumber: number
  seriesCode: string
  names: {
    matchupName: string
    matchupShortName: string
    teamAbbreviationA: string
    teamAbbreviationB: string
    seriesSlug: string
  }
  currentGame: {
    seriesSummary: {
      gamePk?: number
      gameNumber?: number
      gameLabel?: string
      necessary?: boolean
      gameCode?: number
      gameTime?: string
      seriesStatus?: string
      seriesStatusShort?: string
    }
  }
  conference: {
    id: number
    name: string
    link: string
  }
  round: {
    number: number
  }
  matchupTeams: IPlayoffMatchupTeam[]
}

export interface IPlayoffMatchupTeam {
  team: {
    id: number
    name: string
    link: string
  }
  seed: {
    type: string
    rank: number
    isTop: boolean
  }
  seriesRecord: {
    wins: number
    losses: number
  }
}
