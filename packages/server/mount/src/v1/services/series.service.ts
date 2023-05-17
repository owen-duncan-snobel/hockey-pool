import axios from "axios"
import { TOURNAMENT_PLAYOFFS_URL } from "../../constants/playoffs"
import { IPlayoff, IPlayoffMatchupTeam, IPlayoffSeries } from "../../types/playoffs"
import prisma from "../../libs/prisma/prisma"
import HttpException from "../../exceptions/http-exception"

interface IPlayoffSeriesWithSeason extends IPlayoffSeries {
  season: string
}

interface IPlayoffSeriesWithSeasonAndTeams extends IPlayoffSeriesWithSeason {
  team: IPlayoffMatchupTeam
}

export const createOrUpdateSeries = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) throw new HttpException({
    message: response.data,
    status: response.status
  })
  
  const data: IPlayoff = response.data
  const series: IPlayoffSeriesWithSeason[] = []
  const { rounds, season } = data
  rounds.forEach(round => {
    round.series.forEach((s) => {
      const slot: IPlayoffSeriesWithSeason= {
        ...s,
        season,
      }
      series.push(slot)
    })
  })
  
  await prisma.$transaction(
    series.map((s) => prisma.series.upsert({
      where: {
        season_round_seriesCode: {
          season,
          round: s.round.number,
          seriesCode: s.seriesCode
        }
      },
      update: {
        round: s.round.number,
        seriesCode: s.seriesCode,
      },
       create: {
        season,
        round: s.round.number,
        seriesCode: s.seriesCode,
       }
    }))
  )
}

export const updateSeriesToTeams = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) throw new HttpException({
    message: response.data,
    status: response.status
  })

  const data: IPlayoff = response.data
  const series: IPlayoffSeriesWithSeasonAndTeams[] = []
  const { rounds, season } = data
  rounds.forEach(round => {
    round.series.forEach((s) => {
      if (!s.matchupTeams) return
      const slots: IPlayoffSeriesWithSeasonAndTeams[] = s.matchupTeams.map((team) => {
        return {
          ...s,
          team,
          season
        }
      })
      series.push(...slots)
    })
  })
  
  await prisma.teamsInSeries.createMany({
    data: series.map((s) => ({
      season: s.season,
      teamId: s.team.team.id,
      round: s.round.number,
      seriesCode: s.seriesCode,
    })),
    skipDuplicates: true,
  })
}

export const getSeries = async () => {
  return await prisma.series.findMany({
    include: {
      teams: {
        select: {
          team: true,
        }
      }
    }
  })
}
