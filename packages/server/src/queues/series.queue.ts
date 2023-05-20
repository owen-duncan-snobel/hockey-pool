import { Queue, Worker } from 'bullmq'
import { createOrUpdateSeries, syncPlayoffSeriesWithTeams } from '../v1/services/nhlseries.service'

const queue = new Queue('series-queue', {
  connection: {
    host: 'redis',
    port: 6379,
  },
})

const worker = new Worker('series-queue', async (job) => {
  await createOrUpdateSeries()
  await syncPlayoffSeriesWithTeams()
}, {
  connection: {
    host: 'redis',
    port: 6379,
  },
})

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.error(`${job ? job.id : job} has failed with ${err.message}`);
});

export const updateSeriesDaily = async () => {
  await queue.add('series', {}, {
    repeat: {
      pattern: '0 0 2 * * *', // repeat every day at 2:00am
      tz: 'america/toronto',
      limit: 1
    },
  })
}