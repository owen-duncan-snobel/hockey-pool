import app from '../../server'
import { getSessionToken } from '../helper'
import supertest from 'supertest'
import { worker } from '../../queues/series.queue'
import redisClient from '../../libs/ioredis/redis'

afterAll(async () => {
  // await redisClient.quit()
  await worker.close()
})

const request = supertest(app)

describe('nhlstandings controller', () => {
  describe('GET /NHLStandings', () => {
    it('should return the standings', async () => {
      const token = await getSessionToken()
      expect(token).toBeDefined()
      const response = await request.get('/api/v1/NHLStandings')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('standings')  
    })

    it('should return a 401 if no token is provided', async () => {
      const response = await request.get('/api/v1/NHLStandings')
      expect(response.status).toBe(401)
    })
  })
})
