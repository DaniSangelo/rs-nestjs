import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@/core/events/domain-events'

const prisma = new PrismaClient()

function generateUniqueDataBaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('Please, provide a DATABASE_URL environment variable')
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const dbUrl = generateUniqueDataBaseUrl(schemaId)
  process.env.DATABASE_URL = dbUrl
  DomainEvents.shouldRun = false
  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
