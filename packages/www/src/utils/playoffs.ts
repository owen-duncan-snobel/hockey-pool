import { Node, XYPosition } from 'reactflow'

import { IPlayoff, IPlayoffMatchupTeam } from '@backend/types/playoffs'

const HEIGHT_OFFSET = 80
const WIDTH_OFFSET = 240

type NHL_ROUND = 1 | 2 | 3 | 4

const TEAMS_PER_NHL_PLAYOFF_ROUNDS: {[key in NHL_ROUND]: number} = {
  1: 16,
  2: 8,
  3: 4,
  4: 2
}


export function NHLTeamsInRound({
  data,
  round
}: {
  data: IPlayoff,
  round: NHL_ROUND
}){
  const teams: IPlayoffMatchupTeam[] = []
  const ROUND_INDEX = round - 1
  
  if (!(ROUND_INDEX in data.rounds)) return teams

  data.rounds[ROUND_INDEX].series.forEach(series => {
    if ('matchupTeams' in series){
      teams.push(...series.matchupTeams)
    }
  })
  return teams
}

export const playoffBracketPosition = ({ round, teamIndex}: {
  round: NHL_ROUND
  teamIndex: number
}): XYPosition => {

  const NUMBER_OF_TEAMS = TEAMS_PER_NHL_PLAYOFF_ROUNDS[round]
  const NUMBER_OF_SERIES = TEAMS_PER_NHL_PLAYOFF_ROUNDS[round] / 2  

  return {
    x: 0,
    y: 0
  }
}

export const playoffNodePosition = (data: IPlayoff): {x: number, y: number} => {
  const numberOfRounds = data.rounds.length

  return {
    x: 0,
    y: 0
  }
}