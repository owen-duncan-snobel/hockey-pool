import prisma from "../../libs/prisma/prisma"
import { NHLBracketPicksDto } from "../../types/playoffs"
import { playoffSeriesHaveNotStarted } from "../../utils/playoffs"
import { NHLPicksQuery } from "../schemas/nhlpicks.schema"
import { getActiveRound, getActiveSeason, getActiveSeries } from "./nhlseries.service"

export const getNhlBracketPicks = async (query?: NHLPicksQuery) => {
  return await prisma.nhlBracketPick.findMany({
    where: {
      ...query,
      active: true
    },
    include: {
      pick: true,
      user: {
        select: {
          id: true,
          username: true,
        }
      }
    },
  })
}

export const createNhlBracketPicks = async (createNhlBracketPicksDto: NHLBracketPicksDto, userId: number) => {
  const picks = createNhlBracketPicksDto.map((p) => {
    return {
      ...p,
      userId: userId
    }
  })
  return await prisma.$transaction(
    picks.map((p) => prisma.nhlBracketPick.upsert({
      where: {
        userId_round_season_seriesCode: {
          userId: p.userId,
          round: p.round,
          season: p.season,
          seriesCode: p.seriesCode
        }
      },
      update: {
        teamId: p.teamId
      },
      create: {
        teamId: p.teamId,
        round: p.round,
        season: p.season,
        seriesCode: p.seriesCode,
        userId: p.userId
      }
    }))
  )
}

export const setNhlBracketPicksActive = async ({
  season,
  round,
}: {
  season: string,
  round: number
}) => {
  return await prisma.nhlBracketPick.updateMany({
    where: {
      season,
      round: {
        lte: round
      }
    },
    data: {
      active: true
    }
  })
}

export const activateNhlBracketPicks = async () => {
  const currentSeason = await getActiveSeason()
  const currentRound = await getActiveRound(currentSeason?.season)
  const activeSeries = await getActiveSeries({
    round: currentRound?.round || 1,
    season: currentSeason?.season || 'undefined'
  })
  const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
  if (seriesNotStarted) return
  await setNhlBracketPicksActive({
    season: currentSeason?.season || 'undefined',
    round: currentRound?.round || -1
  })
}