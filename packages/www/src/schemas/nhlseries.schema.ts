import { z } from 'zod'

export const NHLSeasonSchema = z.string({
  invalid_type_error: 'Season must be a string ex. 20192020',
})
  .regex(/^\d{8}$/, 'Season must 8 digits ex. 20192020')

export const NHLRoundSchema = z.coerce.number({
  invalid_type_error: 'round must be a number ex. 1',
})
  .min(1, 'Round must be greater than or equal to 1 and less than or equal to 4')
  .max(4, 'Round must be greater than or equal to 1 and less than or equal to 4')

export const NhlSeriesQuerySchema = z.object({
  season: NHLSeasonSchema.optional(),
  round: NHLRoundSchema.optional(),
})
