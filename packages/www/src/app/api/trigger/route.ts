
import { createAppRoute } from "@trigger.dev/nextjs";
import { client } from "@/libs/trigger-dev/trigger";

// Replace this with your own jobs
import "@/jobs/nhlseries";


//this route is used to send and receive data with Trigger.dev
export const { POST, dynamic } = createAppRoute(client);
