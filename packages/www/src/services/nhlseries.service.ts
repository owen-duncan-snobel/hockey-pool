import axios from 'axios'
import { TOURNAMENT_PLAYOFFS_URL } from '../../constants/playoffs'
import { IPlayoff, IPlayoffMatchupTeam, IPlayoffSeries } from '../../types/playoffs'
import prisma from '../../libs/prisma/prisma'
import HttpException from '../../exceptions/http-exception'

interface IPlayoffSeriesWithSeason extends IPlayoffSeries {
  season: string
}

interface IPlayoffSeriesWithSeasonAndTeams extends IPlayoffSeriesWithSeason {
  team: IPlayoffMatchupTeam
}

export const createOrUpdateSeries = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) {
    throw new HttpException({
      message: response.data,
      status: response.status,
    })
  }

  const { data }: { data: IPlayoff } = response
  const series: IPlayoffSeriesWithSeason[] = []
  const { rounds, season } = data
  rounds.forEach((round) => {
    round.series.forEach((s) => {
      const slot: IPlayoffSeriesWithSeason = {
        ...s,
        season,
      }
      series.push(slot)
    })
  })

  await prisma.$transaction(
    series.map((s) => prisma.nhlSeries.upsert({
      where: {
        season_round_seriesCode: {
          season,
          round: s.round.number,
          seriesCode: s.seriesCode,
        },
      },
      update: {
        round: s.round.number,
        seriesCode: s.seriesCode,
        currentGameId: s.currentGame.seriesSummary.gamePk,
        gameLabel: s.currentGame.seriesSummary.gameLabel,
        gameNumber: s.currentGame.seriesSummary.gameNumber,
        gameTime: s.currentGame.seriesSummary.gameTime
          ? new Date(s.currentGame.seriesSummary.gameTime)
          : undefined,
        seriesStatus: s.currentGame.seriesSummary.seriesStatus,
        seriesStatusShort: s.currentGame.seriesSummary.seriesStatusShort,
      },
      create: {
        season,
        round: s.round.number,
        seriesCode: s.seriesCode,
        currentGameId: s.currentGame.seriesSummary.gamePk,
        gameLabel: s.currentGame.seriesSummary.gameLabel,
        gameNumber: s.currentGame.seriesSummary.gameNumber,
        gameTime: s.currentGame.seriesSummary.gameTime
          ? new Date(s.currentGame.seriesSummary.gameTime)
          : undefined,
        seriesStatus: s.currentGame.seriesSummary.seriesStatus,
        seriesStatusShort: s.currentGame.seriesSummary.seriesStatusShort,
      },
    })),
  )
}

export const syncPlayoffSeriesWithTeams = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) {
    throw new HttpException({
      message: response.data,
      status: response.status,
    })
  }

  const { data }: { data: IPlayoff } = response
  const series: IPlayoffSeriesWithSeasonAndTeams[] = []
  const { rounds, season } = data
  rounds.forEach((round) => {
    round.series.forEach((s) => {
      if (!s.matchupTeams) return
      const slots: IPlayoffSeriesWithSeasonAndTeams[] = s.matchupTeams.map((team) => ({
        ...s,
        team,
        season,
      }))
      series.push(...slots)
    })
  })

  const synced = await prisma.$transaction(
    series.map((s) => prisma.nhlTeamInSeries.upsert({
      where: {
        teamId_round_season_seriesCode: {
          round: s.round.number,
          season: s.season,
          seriesCode: s.seriesCode,
          teamId: s.team.team.id,
        },
      },
      update: {
        seriesWins: s.team.seriesRecord.wins,
        seriesLosses: s.team.seriesRecord.losses,
      },
      create: {
        team: {
          connect: {
            id: s.team.team.id,
          },
        },
        series: {
          connect: {
            season_round_seriesCode: {
              season: s.season,
              round: s.round.number,
              seriesCode: s.seriesCode,
            },
          },
        },
      },
    })),
  )

  console.log('synced: ', synced.length)

  // ! DEPRECATED
  // const synced = await prisma.nhlTeamInSeries.createMany({
  //   data: series.map((s) => ({
  //     season: s.season,
  //     teamId: s.team.team.id,
  //     round: s.round.number,
  //     seriesCode: s.seriesCode,
  //     team: {
  //       connect: {
  //         id: s.team.team.id,
  //       },
  //     },
  //     series: {
  //       connect: {
  //         season_round_seriesCode: {
  //           season: s.season,
  //           round: s.round.number,
  //           seriesCode: s.seriesCode,
  //         },
  //       },
  //     },
  //   })),
  //   skipDuplicates: true,
  // })
}

export const getSeries = async ({
  season,
  round,
} : {
  season?: string,
  round?: number
}) => prisma.nhlSeries.findMany({
  where: {
    season,
    round,
  },
  include: {
    teams: {
      select: {
        team: true,
      },
    },
  },
})

export const getActiveSeason = async () => prisma.nhlSeries.findFirst({
  orderBy: {
    season: 'desc',
  },
  select: {
    season: true,
  },
})

export const getActiveRound = async (season?: string) => prisma.nhlSeries.findFirst({
  where: {
    season,
    currentGameId: {
      not: null,
    },
  },
  orderBy: {
    round: 'desc',
  },
  select: {
    round: true,
  },
})

export const getActiveSeries = async ({
  round,
  season,
}: {
  round: number
  season: string
}) => prisma.nhlSeries.findMany({
  where: {
    round,
    season,
  },
  include: {
    teams: {
      select: {
        team: true,
      },
    },
  },
  orderBy: {
    gameTime: 'asc',
  },
})
