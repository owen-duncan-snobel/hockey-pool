import { createNhlBracketPicks } from "../../v1/services/nhlpicks.service"
import { prismaMock } from "../singleton"

describe('nhlpicks services', () => {
  describe('createNhlBracketPicks', () => {
    it('should create a pick', async () => {
      const pick = {
        teamId: 1,
        round: 1,
        season: '20202021',
        seriesCode: 'A',
      }

      prismaMock.$transaction.mockResolvedValue([
        {
          round: 1,
          season: '20202021',
          seriesCode: 'A',
          teamId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          active: true,
        }
      ])

      const data = await createNhlBracketPicks([ pick ], 1)
      expect(data[0]).toEqual(expect.objectContaining({
        round: 1,
        season: '20202021',
        seriesCode: 'A',
        teamId: 1,
        userId: 1,
        active: true,
      }))
    })
  })
    
  describe('activateNhlBracketPicks', () => {
    it('should set all picks to active', () => {
      // need to mock prisma
    })
  })
})