import { Prisma } from "@prisma/client"

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

export type NHLConference = Prisma.NhlConferenceCreateManyInput & {
  id: number
  name: string
  link: string
  abbreviation: string
  shortName: string
  active: boolean
}

export interface NHLDivision {
  id: number
  name: string
  nameShort: string
  link: string
  abbreviation: string
  conference: {
    id: number
    name: string
    link: string
  }
  active: boolean
}

export interface NHLFranchise {
  franchiseId: number
  firstSeasonId: number
  lastSeasonId?: number
  mostRecentTeamId: number
  teamName: string
  locationName: string
  link: string
}

export interface NHLTeam {
  id: number
  name: string
  link: string
  venue: {
    name: string
    link: string
    city: string
    timeZone: {
      id: string
      offset: number
      tz: string
    }
  },
  abbreviation: string
  teamName: string
  locationName: string
  firstYearOfPlay: string
  division: {
    id: number
    name: string
    nameShort: string
    link: string
    abbreviation: string
  }
  conference: {
    id: number
    name: string
    link: string
  }
  franchise: {
    franchiseId: string
    teamName: string
    link: string
  }
  shortName: string
  officialSiteUrl: string
  franchiseId: number
  active: boolean
}
