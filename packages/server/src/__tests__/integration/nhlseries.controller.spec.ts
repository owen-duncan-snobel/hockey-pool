import supertest from 'supertest'
import app from '../../server'
import { worker } from '../../queues/series.queue'

afterAll(async () => {
  await worker.close()
})

const request = supertest(app)

describe('nhlseries controller', () => {
  describe('GET /NHLSeries', () => {
    it('should return the series', async () => {
      const response = await request.get('/api/v1/NHLSeries')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('series')
    })

    it('should return the series for a specific season', async () => {
      const response = await request.get('/api/v1/NHLSeries?season=20222023')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('series')
      expect(response.body.data.series[0].season).toBe('20222023')
    })

    it('should return the series for a specific round', async () => {
      const response = await request.get('/api/v1/NHLSeries?round=1')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('series')
      expect(response.body.data.series[0].round).toBe(1)
    })

    it('should return the series for a specific season and round', async () => {
      const response = await request.get('/api/v1/NHLSeries?season=20222023&round=1')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('series')
      expect(response.body.data.series[0].season).toBe('20222023')
      expect(response.body.data.series[0].round).toBe(1)
    })

    it('should return empty array if no series are found', async () => {
      const response = await request.get('/api/v1/NHLSeries?season=20012000')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('series')
      expect(response.body.data.series.length).toBe(0)
    })

    it('should return 400 if season or round are invalid', async () => {
      const response = await request.get('/api/v1/NHLSeries?season=1&round=5')
      expect(response.status).toBe(400)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('errors')
      expect(response.body.message).toBe('Bad Request')
    })
  })

  describe('GET /NHLSeries/active', () => {
    it('should return the active series', async () => {
      const response = await request.get('/api/v1/NHLSeries/active')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('series')
      expect(response.body.data.seriesStarted).toBeDefined()
    })
  })
})
