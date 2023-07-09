import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from '../libs/prisma/prisma'

jest.mock('../libs/prisma/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

it('should be mocked', async () => {
  expect(true).toBeTruthy()
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
