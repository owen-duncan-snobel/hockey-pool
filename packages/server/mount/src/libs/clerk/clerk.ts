import express, { NextFunction, Request, Response } from 'express'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''


const handleClerkWebhooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const headers = req.headers;
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    const msg = wh.verify(payload, req.headers)
    console.log('WEBHOOK:', msg)
  } catch (err){
    console.log(err)
    res.status(400).json({})
  }
}


export default handleClerkWebhooks