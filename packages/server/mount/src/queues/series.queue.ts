import { Queue, Worker } from 'bullmq'
import { createOrUpdateSeries, updateSeriesToTeams } from '../v1/services/series.service'

const queue = new Queue("series-queue", {
  connection: {
    host: "redis",
    port: 6379
  }
})

const worker = new Worker('series-queue', async (job) => {
  await createOrUpdateSeries()
  await updateSeriesToTeams()
}, {
  connection: {
    host: "redis",
    port: 6379
  }
})

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.error(`${job ? job.id : job} has failed with ${err.message}`);
});

export const updateSeriesDaily = () => {
  queue.add('series', {}, {
    repeat: {
      pattern: '0 3 * * *', // repeat every day at 3am
    }
  })
}