import setup from '../__tests__/setup'
import prisma from '../libs/prisma/prisma'

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
