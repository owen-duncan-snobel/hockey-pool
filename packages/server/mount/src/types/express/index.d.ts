import { IncomingHttpHeaders } from 'http'
import { WebhookRequiredHeaders } from 'svix'


declare module 'http' {
  interface IncomingHttpHeaders {
		'svix-id': string;
		'svix-timestamp': string;
		'svix-signature': string;
  }
}

declare global {
  namespace Express {
    export interface Request {

    }
  }
}