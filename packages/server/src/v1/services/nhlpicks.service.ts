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
  await prisma.nhlBracketPick.createMany({
    data: createNhlBracketPicksDto.map((p) => {
      return {
        ...p,
        userId: userId
      }
    }),
  })
}