import * as service from '../../services/nhlbrackets.service'

describe('Brackets service', () => {
  describe('getNhlBrackets', () => {
    it('should return all brackets', async () => {
      const data = await service.getNhlBrackets()
      expect(data).toBeDefined()
      expect(data).toHaveProperty('rounds')
      expect(data).toHaveProperty('season')
      expect(data).toHaveProperty('defaultRound')
    })
  })

  describe('currentPlayoffRound', () => {
    it('should return the current playoff round', async () => {
      const data = await service.currentPlayoffRound()
      expect(data).toBeDefined()
      expect(data).toBeGreaterThanOrEqual(1)
    })
  })
})
