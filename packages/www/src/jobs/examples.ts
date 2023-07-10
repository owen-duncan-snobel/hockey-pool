
import { Job, cronTrigger, eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/libs/trigger-dev/trigger";
import prisma from "@/libs/prisma/prisma";

new Job(client, {
	id: 'get-teams',
	name: 'Get NHL Teams',
	version: '0.1.1',
	trigger: cronTrigger({
		cron: '*/5 * * * *', // every 5 minutes
	}),
	run: async (payload, io, ctx) => {
		//wrap anything in io.runTask so it's resumable and displays in logs
		const teams = await io.runTask(
			'Get teams',
			//you can add metadata to the task to improve the display in the logs
			{ name: 'Get teams from prisma', },
			async () => {
				//you can use fetch, axios, or any other library to make requests
        const data = await prisma.nhlTeam.findMany()
				return data
			}
		)
	},
})
