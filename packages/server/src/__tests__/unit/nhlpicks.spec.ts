import prisma from '../../libs/prisma/prisma'
import * as services from '../../v1/services/nhlpicks.service'
import { dummyUser } from '../setup'

describe('nhlPicks', () => {
  describe('createNhlBracketPick', () => {
    it('should create a new nhl bracket pick', async () => {
      const activeSeries = await prisma.nhlTeamInSeries.findFirst({
        where: {
          season: '20222023',
          round: 1
        },
        select: {
          team: true,
          seriesCode: true,
          teamId: true,
          season: true,
        }
      })

      await services.createNhlBracketPick({
        userId: dummyUser.id,
        round: 1,
        season: activeSeries?.season || '',
        seriesCode: activeSeries?.seriesCode || '',
        teamId: activeSeries?.teamId || 0,
      })

      const pick = await prisma.nhlBracketPick.findFirst({
        where: {
          userId: dummyUser.id,
        }
      })
      expect(pick).toBeDefined()
      expect(pick?.userId).toEqual(dummyUser.id)
      expect(pick?.round).toEqual(1)
      expect(pick?.season).toEqual(activeSeries?.season)
      expect(pick?.seriesCode).toEqual(activeSeries?.seriesCode)
      expect(pick?.teamId).toEqual(activeSeries?.teamId)
    
      await prisma.nhlBracketPick.delete({
        where: {
          id: pick?.id
        }
      })
    })
  })
})