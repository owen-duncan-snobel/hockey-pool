import { NextFunction, Request, Response } from 'express'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''

type SvixHeaders = IncomingHttpHeaders & WebhookRequiredHeaders

interface ClerkUserCreated {
  data: {[key: string]: any},
  object: string,
  type: string
}

const handleClerkWebhooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const headers = req.headers;
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    const msg = wh.verify(payload, headers as SvixHeaders) as ClerkUserCreated

    if (msg.type === 'user.created'){
      // insert user into db 
      
      // msg.data.id
    } else if (msg.type === 'user.updated'){
      // update any changed user properties

    }


    res.status(200).json({})

  } catch (err){
    console.log(err)
    next(err)
    res.status(400).json({})
  }
}

export default handleClerkWebhooks