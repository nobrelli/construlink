import { drizzle } from 'drizzle-orm/node-postgres'

export function databaseInitializer() {
  if (!('DATABASE_URL' in process.env)) {
    throw new Error('DATABASE_URL is not defined in the env file.')
  }

  return drizzle({
    connection: {
      connectionString: process.env.DATABASE_URL as string,
    },
    logger: true,
  })
}
