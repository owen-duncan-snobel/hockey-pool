import app from '../../server'
import { getSessionToken } from '../helper'
import supertest from 'supertest'
import { worker } from '../../queues/series.queue'

// ! BUG this test fails for unknown reason
// ! the response body is {} but if tested in postman it runs correctly
// ! there should be no difference between the two
afterAll(async () => {
  // await redisClient.quit()
  await worker.close()
})

const request = supertest(app)

describe('nhlpicks controller', () => {
  describe('GET /NHLPicks', () => {
    it('should return the picks', async () => {
      const token = await getSessionToken()
      const response = await request.get('/api/v1/NHLPicks')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('picks')
    })

    it('should return the picks for a specific season', async () => {
      const token = await getSessionToken()
      const response = await request.get('/api/v1/NHLPicks?season=20222023')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      console.log('BODY: ',response.body)
      expect(response.body.data).toHaveProperty('picks')
      expect(response.body.data.picks[0].season).toBe('20222023')
    })

    it('should return the picks for a specific round', async () => {
      const token = await getSessionToken()
      const response = await request.get('/api/v1/NHLPicks?round=1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('picks')
      expect(response.body.data.picks[0].round).toBe(1)
    })
  })
})