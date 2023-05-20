import { PrismaClient } from '@prisma/client'
import * as service from '../../v1/services/nhlseries.service'
import setup from '../setup'
import prisma from '../../libs/prisma/prisma'

afterAll(async () => {
  await prisma.$disconnect()
})

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
      const data = await service.getSeries({})
      expect(data).toBeDefined()
    })

    it('should return all series for a given season', async () => {
      const data = await service.getSeries({ season: '20222023' })
      expect(data).toBeDefined()
    })
    
    it('should return all series for a given round', async () => {
      const data = await service.getSeries({ round: 1 })
      expect(data).toBeDefined()
    })

    it('should return all series for a given season and round', async () => {
      const data = await service.getSeries({ season: '20222023', round: 1 })
      expect(data).toBeDefined()
    })
  })

  describe('getActiveSeason', () => {
    it('should return the active season', async () => {
      await prisma.nhlSeries.create({
        data: {
          round: 1,
          season: '20222023',
          seriesCode: 'Z',
        }
      })
      const data = await service.getActiveSeason()
      expect(data).toBeDefined()
      expect(data).toHaveProperty('season')
      expect(data && data.season).toMatch(/\d{8}/)

      await prisma.nhlSeries.delete({
        where:{
          season_round_seriesCode:{
            season: '20222023',
            round: 1,
            seriesCode: 'Z'
          }
        }
      })
    })
  })

  describe('getActiveRound', () => {
    it('should return the active round', async () => {
      await prisma.nhlSeries.create({
        data: {
          round: 1,
          season: '20222023',
          seriesCode: 'Z',
          currentGameId: -1
        }
      })
      const data = await service.getActiveRound('20222023')
      expect(data).toBeDefined()
      expect(data).toHaveProperty('round')
      expect(data && data.round).toBeGreaterThanOrEqual(1)

      await prisma.nhlSeries.delete({
        where:{
          season_round_seriesCode:{
            season: '20222023',
            round: 1,
            seriesCode: 'Z'
          }
        }
      })

    })
  })

  describe('getActiveSeries',  () => {
    it('should return the active series', async () => {
        const data = await service.getActiveSeries({
          season: '20222023',
          round: 1
      })
      expect(data).toBeDefined()
    })
  })
})
