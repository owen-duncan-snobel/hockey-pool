import prisma from "../../libs/prisma/prisma"
import { NHLBracketPicksDto } from "../../types/playoffs"

export const getNhlBracketPicks = async () => {
  return await prisma.nhlBracketPick.findMany({
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