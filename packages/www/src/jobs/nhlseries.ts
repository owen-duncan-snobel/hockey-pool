import { Job, cronTrigger } from '@trigger.dev/sdk'
import { client } from '@/libs/trigger-dev/trigger'
import prisma from '@/libs/prisma/prisma'
import { createOrUpdateSeries, syncPlayoffSeriesWithTeams } from '@/services/nhlseries.service'
import { activateNhlBracketPicks } from '@/services/nhlpicks.service'

new Job(client, {
	id: 'update-nhl-series',
	name: 'Updates the NHL Series (Series status, future series, etc.)',
	version: '0.0.1',
	trigger: cronTrigger({
		cron: '0 4 * * *', // runs at 4:00 UTC (12:00EST) every day
	}),
	run: async (payload, io, ctx) => {
		//wrap anything in io.runTask so it's resumable and displays in logs
		const series = await io.runTask(
			'Create or update series',
			{ name: 'Create or update series service' },
			async () => {
				const updatedSeries = await createOrUpdateSeries()
				const synced = await syncPlayoffSeriesWithTeams()
        io.logger.log('UPDATED SERIES:', updatedSeries)
        io.logger.log('SYNCED:', synced)
			}
		)
	},
})

new Job(client, {
	id: 'activate-nhl-bracket-picks',
	name: 'Set NHL Bracket picks to active once current round has begun',
  version: '0.0.1',
	trigger: cronTrigger({
		cron: '0 4 * * *', // runs at 4:00 UTC (12:00EST) every day
	}),
  run: async (payload, io, ctx) => {
    const series = await io.runTask(
		'Create or update series',
		{ name: 'Create or update series service' },
		async () => {
      const activated = await activateNhlBracketPicks()
      if (!activated){
        io.logger.log('NHL HAS SERIES NOT STARTED')
      } else {
        io.logger.log('NHL BRACKET PICKS ACTIVATED:', activated)
      }
		}
	)
  }
})
