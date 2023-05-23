import Redis from 'ioredis'

const { REDIS_URL } = process.env

const client = new Redis(REDIS_URL!)

client.on('error', (err) => {
  console.error('Error connecting to redis: ', err)
})

export default client
