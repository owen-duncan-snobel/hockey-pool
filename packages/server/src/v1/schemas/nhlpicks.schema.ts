import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { NHLRoundSchema, NHLSeasonSchema } from './nhlseries.schema'

export const NHLBracketPicksSchema = z.object({
  userId: z.number(),
  teamId: z.number(),
  round: NHLRoundSchema,
  season: NHLSeasonSchema,
  seriesCode: z.string(),
})

export type NHLBracketPicksDto = z.infer<typeof NHLBracketPicksSchema>