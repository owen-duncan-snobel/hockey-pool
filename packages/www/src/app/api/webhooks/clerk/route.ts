import type { WebhookEvent } from '@clerk/nextjs/api'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
import prisma from '@/libs/prisma/prisma'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

// TODO zod schema for env vars
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''

type SvixHeaders = IncomingHttpHeaders & WebhookRequiredHeaders

interface ClerkUserCreated {
  data: { [key: string]: any },
  object: string,
  type: string
}

export async function POST(req: NextRequest) {
  try {
    const wh_headers: WebhookRequiredHeaders = {
      'svix-id': req.headers.get('svix-id') ?? '',
      'svix-signature': req.headers.get('svix-signature') ?? '',
      'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
    }
    const rawbody = await req.text()
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    const event = wh.verify(rawbody, wh_headers) as WebhookEvent

    if (event.type === 'user.created'){
      await prisma.user.create({
        data: {
          clerk_id: event.data.id,
          username: event.data.username
        }
      })
    } else if (event.type === 'user.updated'){
      await prisma.user.update({
        data: {
          username: event.data.username,
          firstName: event.data.first_name,
          lastName: event.data.last_name
        },
        where: {
          clerk_id: event.data.id
        }
      })
    }
    return NextResponse.json(null, {
      status: 200
    })
  } catch (err: any){
    console.log(err)
    return NextResponse.json({
			error: 'Error creating or updating user',
			success: false,
		},
		{
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		}
	)}
}
