import * as service from '../../services/nhlseries.service'

describe('Series service', () => {
  describe('createOrUpdateSeries', () => {
    it('should create or update the series', async () => {
      expect(async () => await service.createOrUpdateSeries()).not.toThrow()
    })
  })

  describe('syncPlayoffSeriesWithTeams', () => {
    it('should update the series to teams', async () => {
      expect(async () => await service.syncPlayoffSeriesWithTeams()).not.toThrow()
    })
  })
})
