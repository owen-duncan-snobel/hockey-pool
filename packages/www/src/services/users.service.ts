import prisma from '../../libs/prisma/prisma'

export const getUser = async (clerk_id: string) => prisma.user.findUnique({
  where: {
    clerk_id,
  },
  select: {
    id: true,
    username: true,
    nhlBracketPicks: true,
  },
})

export const getUserId = async (clerk_id: string) => prisma.user.findUnique({
  where: {
    clerk_id,
  },
  select: {
    id: true,
  },
})
