import { z } from 'zod'
import { NHLRoundSchema, NHLSeasonSchema } from './nhlseries.schema'

export const NHLBracketPicksSchema = z.object({
  teamId: z.number(),
  round: NHLRoundSchema,
  season: NHLSeasonSchema,
  seriesCode: z.string(),
}).array()

export const NHLPicksQuerySchema = z.object({
  userId: z.coerce.number().optional(),
  teamId: z.coerce.number().optional(),
  round: NHLRoundSchema.optional(),
  season: NHLSeasonSchema.optional(),
  seriesCode: z.string().optional(),
})

export type NHLPicksQuery = z.infer<typeof NHLPicksQuerySchema>