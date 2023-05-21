import { z } from 'zod'
import { NHLRoundSchema, NHLSeasonSchema } from './nhlseries.schema'

export const NHLBracketPicksSchema = z.object({
  teamId: z.number(),
  round: NHLRoundSchema,
  season: NHLSeasonSchema,
  seriesCode: z.string(),
}).array()
