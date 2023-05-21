import * as service from '../../v1/services/nhlseries.service'
import prisma from '../../libs/prisma/prisma'

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Series service', () => {
  // describe('createOrUpdateSeries', () => {
  //   it('should create or update the series', async () => {
  //     expect(async () => await service.createOrUpdateSeries()).not.toThrow()
  //   })
  // })

  // describe('syncPlayoffSeriesWithTeams', () => {
  //   it('should update the series to teams', async () => {
  //     expect(async () => await service.syncPlayoffSeriesWithTeams()).not.toThrow()
  //   })
  // })
})
