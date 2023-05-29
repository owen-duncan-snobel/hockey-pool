import app from '../../server'
import { getSessionToken } from '../helper'
import supertest from 'supertest'
import { worker } from '../../queues/series.queue'

afterAll(async () => {
  await worker.close()
})

const request = supertest(app)

describe('nhlbrackets controller', () => {
  describe('GET /NHLBrackets', () => {
    it('should return the brackets', async () => {
      const response = await request.get('/api/v1/NHLBrackets')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('brackets')  
    })
  })
})