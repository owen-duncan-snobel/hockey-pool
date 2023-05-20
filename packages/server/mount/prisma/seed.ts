import { PrismaClient } from '@prisma/client'
import setup from '../src/__tests__/setup'

const prisma = new PrismaClient()

async function main() {
  await setup(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
