import * as redis from 'redis'

const { REDIS_URL } = process.env
const { REDIS_PASSWORD } = process.env

const client = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
})

client.connect()

client.on('error', (err) => {
  console.log('Error connecting to redis: ', err)
})

export default client
