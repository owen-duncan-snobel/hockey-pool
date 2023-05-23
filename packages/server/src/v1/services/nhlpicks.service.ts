import prisma from "../../libs/prisma/prisma"
import { NHLBracketPicksDto } from "../../types/playoffs"
import { NHLPicksQuery } from "../schemas/nhlpicks.schema"

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
  await prisma.$transaction(
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
  await prisma.nhlBracketPick.updateMany({
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