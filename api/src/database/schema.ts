import { relations, sql } from 'drizzle-orm'
import {
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

const withId = {
  id: uuid().defaultRandom().primaryKey().notNull(),
}

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now() AT TIME ZONE 'utc'::text`
  ),
}

export const rolesEnum = pgEnum('role', ['employer', 'tradesperson'])
export const jobStatusEnum = pgEnum('status', [
  'open',
  'in_progress',
  'completed',
])
export const jobApplicationStatusEnum = pgEnum('status', [
  'pending',
  'accepted',
  'declined',
])

export const users = pgTable('users', {
  ...withId,
  ...timestamps,
  role: rolesEnum(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  street: varchar(),
  barangay: varchar(),
  municipality: varchar(),
  province: varchar(),
  state: varchar(),
  country: varchar(),
  email: varchar(),
  phone: varchar(),
  passwordHash: varchar('password_hash'),
  profilePhotoUrl: varchar('profile_photo_url'),
  bio: text(),
})

export const trades = pgTable('trades', {
  ...withId,
  ...timestamps,
  name: varchar().notNull(),
  description: varchar(),
})

export const tradespersonsProfile = pgTable('tradespersons', {
  ...withId,
  updatedAt: timestamps.updatedAt,
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  completedJobsCount: integer('completed_jobs_count').default(0),
})

export const employersProfile = pgTable('employers', {
  ...withId,
  updatedAt: timestamps.updatedAt,
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  hireCount: integer('hire_count').default(0),
  companyName: varchar('company_name'),
  companySize: integer('company_size'),
  companyEmail: varchar('company_email'),
  companyPhone: varchar('company_phone'),
})

export const tradespersonsToTrades = pgTable('tradespersons_to_trades', {
  tradespersonId: uuid('tradesperson_id')
    .notNull()
    .references(() => users.id),
  tradeId: uuid('trade_id')
    .notNull()
    .references(() => trades.id),
})

export const jobPosts = pgTable('job_posts', {
  ...withId,
  ...timestamps,
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar().notNull(),
  description: varchar().notNull(),
  location: varchar().notNull(),
  budget: varchar(),
  category: varchar(),
  status: jobStatusEnum(),
  deadline: date(),
})

export const jobApplications = pgTable('job_applications', {
  ...withId,
  ...timestamps,
  jobId: uuid('job_id').references(() => jobPosts.id, { onDelete: 'cascade' }),
  tradespersonId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  status: jobApplicationStatusEnum(),
})

export const availabilitySchedules = pgTable('schedules', {
  ...withId,
  updatedAt: timestamps.updatedAt,
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  schedule: jsonb().default([]),
})

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  tradespersonsProfile: one(tradespersonsProfile),
  employersProfile: one(employersProfile),
  jobPosts: many(jobPosts),
  jobApplications: many(jobApplications),
  availabilitySchedules: one(availabilitySchedules),
}))

export const tradesRelations = relations(trades, ({ many }) => ({
  tradespersonsToTrades: many(tradespersonsToTrades),
}))

export const tradespersonsRelations = relations(trades, ({ many }) => ({
  tradespersonsToTrades: many(tradespersonsToTrades),
}))

export const jobPostsRelations = relations(jobPosts, ({ many }) => ({
  jobApplications: many(jobApplications),
}))
