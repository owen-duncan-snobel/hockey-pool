import { NextFunction, Request, Response } from 'express'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
import prisma from '../prisma/prisma'

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''

type SvixHeaders = IncomingHttpHeaders & WebhookRequiredHeaders

interface ClerkUserCreated {
  data: { [key: string]: any },
  object: string,
  type: string
}

const handleClerkWebhooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const { headers } = req
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    const msg = wh.verify(payload, headers as SvixHeaders) as ClerkUserCreated

    if (msg.type === 'user.created') {
      await prisma.user.create({
        data: {
          clerk_id: msg.data.id,
          username: msg.data.username,
        },
      })
    } else if (msg.type === 'user.updated') {
      await prisma.user.update({
        data: {
          username: msg.data.username,
        },
        where: {
          clerk_id: msg.data.id,
        },
      })
    }

    res.status(200).json({})
  } catch (err) {
    next(err)
  }
}

export default handleClerkWebhooks
