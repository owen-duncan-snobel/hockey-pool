import * as service from '../../v1/services/nhlseries.service'

// TODO should be able to mock the prisma client
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

  describe('getSeries', () => {
    it('should return all series', async () => {
      const data = await service.getSeries()
      expect(data).toBeDefined()
    })
  })

  describe('getActiveSeason', () => {
    it('should return the active season', async () => {
      const data = await service.getActiveSeason()
      expect(data).toBeDefined()
      expect(data).toHaveProperty('season')
      expect(data && data.season).toMatch(/\d{8}/)
    })
  })

  describe('getActiveRound', () => {
    it('should return the active round', async () => {
      const data = await service.getActiveRound('20222023')
      expect(data).toBeDefined()
      expect(data).toHaveProperty('round')
      expect(data && data.round).toBeGreaterThanOrEqual(1)
    })
  })
})
