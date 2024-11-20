import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

if (!('DATABASE_URL' in process.env)) {
  throw new Error('DATABASE_URL is not defined in the env file.')
}

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
