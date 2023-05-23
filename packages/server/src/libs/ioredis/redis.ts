import Redis from 'ioredis'

const { REDIS_URL } = process.env

const client = new Redis(REDIS_URL!, {
  maxRetriesPerRequest: null
})

client.on('error', (err) => {
  console.error('Error connecting to redis: ', err)
})

export default client
