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
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.error(`${job ? job.id : job} has failed with ${err.message}`);
});

export const updateSeries = async () => {
  await queue.add('series', {}, {
    repeat: {
      pattern: '0 30 * * * *', // repeat every 30 mins
      tz: 'america/toronto',
      limit: 1
    },
  })
}

export const setPicksToActive = async () => {
  await queue.add('activatePicks', {}, {
    repeat: {
      pattern: '0 0 0 * * *', // repeat every day at midnight
      tz: 'america/toronto',
      limit: 1
    }
  })
}