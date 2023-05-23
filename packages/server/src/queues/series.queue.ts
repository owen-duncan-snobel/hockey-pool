import { Queue, Worker } from 'bullmq'
import { 
  createOrUpdateSeries,
  getActiveRound, 
  getActiveSeason, 
  getActiveSeries, 
  syncPlayoffSeriesWithTeams 
} from '../v1/services/nhlseries.service'
import { playoffSeriesHaveNotStarted } from '../utils/playoffs'
import { setNhlBracketPicksActive } from '../v1/services/nhlpicks.service'
import redisClient from '../libs/ioredis/redis'

const queue = new Queue('series-queue', {
  connection: redisClient
})

const worker = new Worker('series-queue', async (job) => {
  if (job.name === 'series') {
    await createOrUpdateSeries()
    await syncPlayoffSeriesWithTeams()
  } 
  else if (job.name === 'activatePicks') {
    // if round has started set the picks to active so others can view them
    const currentSeason = await getActiveSeason()
    const currentRound = await getActiveRound(currentSeason?.season)
    const activeSeries = await getActiveSeries({
      round: currentRound?.round || 1,
      season: currentSeason?.season || 'undefined'
    })
    const seriesNotStarted = playoffSeriesHaveNotStarted(activeSeries)
    if (!seriesNotStarted) return
    await setNhlBracketPicksActive({
      season: currentSeason?.season || 'undefined',
      round: currentRound?.round || -1
    })
  }
}, {
  connection: redisClient
})

worker.on('completed', (job) => {
  console.log(`${job.name}: ${job.id} has completed!`)
})

worker.on('active', (job) => {
  console.log(`${job.name}: ${job.id} has started!`)
})

worker.on('failed', (job, err) => {
  console.error(`${job?.name}: ${job ? job.id : job} has failed with ${err.message}`);
});

const updateSeries = async () => {
  await queue.add('series', {}, {
    repeat: {
      pattern: '0 * * * *', // repeat every hour at the top of the hour
      tz: 'america/toronto',
      limit: 1
    },
  })
}

const setPicksToActive = async () => {
  await queue.add('activatePicks', {}, {
    repeat: {
      pattern: '0 0 0 * * *', // repeat every day at midnight
      tz: 'america/toronto',
      limit: 1
    }
  })
}

export const addJobs = async () => {
  const repeatableJobs = await queue.getRepeatableJobs()
  repeatableJobs.forEach(async job => {
    await queue.removeRepeatableByKey(job.key)
  })
  await updateSeries()
  await setPicksToActive()

  const repeatableJobsAfter = await queue.getRepeatableJobs()
  console.log('repeatableJobsAfter', repeatableJobsAfter)
}