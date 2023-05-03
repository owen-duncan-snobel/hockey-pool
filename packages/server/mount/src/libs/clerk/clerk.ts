import express, { NextFunction, Request, Response } from 'express'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''

type SvixHeaders = IncomingHttpHeaders & WebhookRequiredHeaders

const handleClerkWebhooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const headers = req.headers;
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    const msg = wh.verify(payload, headers as SvixHeaders)

    console.log('WEBHOOK:', msg)
    res.status(200).json({})
  } catch (err){
    console.log(err)
    res.status(400).json({})
  }
}


export default handleClerkWebhooks