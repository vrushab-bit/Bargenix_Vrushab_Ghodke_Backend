import { PrismaClient } from '@prisma/client'
import { users, products } from './mockData'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Seeding database...')
    users.forEach(async (user) => {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          passwordHash: user.passwordHash
        }
      })
    })

    products.forEach(async (product) => {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          price: product.price
        }
      })
    })
    console.log('Database Seeded Successfully!')
  } catch (e) {
    console.error(e)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
