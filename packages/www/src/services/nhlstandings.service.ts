import prisma from '../libs/prisma/prisma'
import { IPlayoffUserStanding } from '../types/playoffs'
import { getActiveSeason } from './nhlseries.service'

export const getCurrentSeasonPlayoffStandingsForAllUsers = async () => {
  const currentSeason = await getActiveSeason()
  const users = await prisma.user.findMany({
    where: {
      nhlBracketPicks: {
        some: {
          season: currentSeason?.season,
          active: true,
        },
      },
    },
    select: {
      id: true,
      username: true,
      nhlBracketPicks: {
        where: {
          active: true,
          season: currentSeason?.season,
        },
        select: {
          value: true,
          pick: {
            select: {
              seriesWins: true,
              team: {
                select: {
                  teamName: true,
                  logo: true,
                },
              },
              round: true,
              season: true,
            },
          },
        },
      },
    },
  })
  const standings: IPlayoffUserStanding[] = []
  users.forEach((user) => {
    const points = user.nhlBracketPicks
      .filter((pick) => pick.pick.seriesWins === 4)
      .reduce((acc, pick) => acc + pick.value, 0)
    user
    const userStandings = {
      id: user.id,
      username: user.username,
      picks: user.nhlBracketPicks,
      points,
    }
    standings.push(userStandings)
  })
  standings.sort((a, b) => b.points - a.points)
  return standings
}
