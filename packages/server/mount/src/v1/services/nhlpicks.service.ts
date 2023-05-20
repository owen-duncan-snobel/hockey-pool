import prisma from "../../libs/prisma/prisma"
import { NHLBracketPicksDto } from "../schemas/nhlpicks.schema"


export const createNhlBracketPick = async (createNhlBracketPickDto: NHLBracketPicksDto) => {
  await prisma.nhlBracketPick.create({
    data: {
      userId: createNhlBracketPickDto.userId,
      round: createNhlBracketPickDto.round,
      season: createNhlBracketPickDto.season,
      seriesCode: createNhlBracketPickDto.seriesCode,
      teamId: createNhlBracketPickDto.teamId
    }
  })
}