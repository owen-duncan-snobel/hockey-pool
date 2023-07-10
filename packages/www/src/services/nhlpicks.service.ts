import { NHL_BRACKET_VALUES } from '../constants/playoffs'
import prisma from '../libs/prisma/prisma'
import { NHLBracketPicksDto } from '../types/playoffs'
import { playoffSeriesHaveNotStarted } from '../utils/playoffs'
import { NHLPicksQuery } from '../schemas/nhlpicks.schema'
import { getActiveRound, getActiveSeason, getActiveSeries } from './nhlseries.service'

export const getNhlBracketPicks = async (query?: NHLPicksQuery) => prisma.nhlBracketPick.findMany({
  where: {
    ...query,
    active: true,
  },
  include: {
    pick: true,
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  },
})

export const createNhlBracketPicks = async (
  createNhlBracketPicksDto: NHLBracketPicksDto,
  userId: number,
) => {
  const picks = createNhlBracketPicksDto.map((p) => ({
    ...p,
    userId,
  }))

  return prisma.$transaction(
    picks.map((p) => prisma.nhlBracketPick.upsert({
      where: {
        userId_round_season_seriesCode: {
          userId: p.userId,
          round: p.round,
          season: p.season,
          seriesCode: p.seriesCode,
        },
      },
      update: {
        teamId: p.teamId,
      },
      create: {
        teamId: p.teamId,
        round: p.round,
        season: p.season,
        seriesCode: p.seriesCode,
        userId: p.userId,
        value: NHL_BRACKET_VALUES[p.round] || 0,
      },
    })),
  )
}

export const setNhlBracketPicksActive = async ({
  season,
  round,
}: {
  season: string|undefined,
  round: number|undefined
}) =>
{
  if (!season || !round) throw new Error('Missing param: round or season')
  return prisma.nhlBracketPick.updateMany({
    where: {
      season,
      round: {
        lte: round,
      },
    },
    data: {
      active: true,
    },
  })
}

export const activateNhlBracketPicks = async () => {
  const currentSeason = await getActiveSeason()
  const currentRound = await getActiveRound(currentSeason?.season)
  const activeSeries = await getActiveSeries({
    round: currentRound?.round,
    season: currentSeason?.season,
  })
  const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
  if (seriesNotStarted) return
  await setNhlBracketPicksActive({
    season: currentSeason?.season,
    round: currentRound?.round,
  })
}
