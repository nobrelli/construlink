import path from 'node:path'
import { faker } from '@faker-js/faker'
import { databaseInitializer } from '.'
import { readJsonFile } from '../utils/readJsonFile'
import { employersProfile, trades, tradespersonsProfile, users } from './schema'
;(async () => {
  const db = databaseInitializer()

  if (!('MOCK_USERS_COUNT' in process.env)) {
    throw new Error('MOCK_USERS_COUNT is not defined in the env file.')
  }

  // Seed trades
  console.info('Seeding trades...')

  const tradesFile = path.join(__dirname, './seed/trades.json')
  const tradesData =
    await readJsonFile<(typeof trades.$inferInsert)[]>(tradesFile)
  await db.insert(trades).values(tradesData)

  // Seed with mock users
  console.info('Seeding users...')

  const usersData: (typeof users.$inferInsert)[] = []

  for (
    let i = 0;
    i < Number.parseInt(process.env.MOCK_USERS_COUNT as string);
    ++i
  ) {
    usersData.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      bio: faker.person.bio(),
      role: faker.datatype.boolean(0.5) ? 'tradesperson' : 'employer',
    })
  }

  await db.transaction(async (tx) => {
    const insertedUsers = await tx.insert(users).values(usersData).returning({
      userId: users.id,
      role: users.role,
    })

    const profileData: {
      tradespersons: (typeof tradespersonsProfile.$inferInsert)[]
      employers: (typeof employersProfile.$inferInsert)[]
    } = {
      tradespersons: [],
      employers: [],
    }

    for (const user of insertedUsers) {
      if (user.role === 'employer') {
        // the employer might own a company
        const hasCompanyProbability = faker.datatype.boolean(0.2)

        profileData.employers.push({
          userId: user.userId,
          companyName: hasCompanyProbability ? faker.company.name() : '',
          companySize: hasCompanyProbability
            ? faker.number.int({ min: 1, max: 500 })
            : 0,
          companyEmail: hasCompanyProbability ? faker.internet.email() : '',
          companyPhone: hasCompanyProbability ? faker.phone.number() : '',
        })
      } else {
        profileData.tradespersons.push({
          userId: user.userId,
        })
      }
    }

    if (profileData.tradespersons.length)
      await tx.insert(tradespersonsProfile).values(profileData.tradespersons)

    if (profileData.employers.length)
      await tx.insert(employersProfile).values(profileData.employers)
  })

  console.info('Seeding done.')
})()
