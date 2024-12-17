import { AlertState, ClAlert } from '@/components/ClAlert'
import { ClPageView } from '@/components/ClPageView'
import { ClSpinner } from '@/components/ClSpinner'
import { ClTextInput } from '@/components/ClTextInput'
import { TradespersonCard } from '@/components/cards/TradespersonCard'
import { createStyles } from '@/helpers/createStyles'
import { joinNames } from '@/helpers/stringUtils'
import { useRenderCount } from '@/hooks/useRenderCount'
import { isEmployer } from '@/stores/auth'
import { Spacing } from '@/theme'
import { Status } from '@/types/Enums'
import type { UserSchema } from '@/types/Schemas'
import { Feather } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

const data = [
  {
    title: 'Carpenter',
    company: 'Steel Company, Inc.',
    address: 'Cebu City, Cebu',
    duration: '30 min',
  },
  {
    title: 'Plumber',
    company: "Evelyn's Home",
    address: 'Odiongan, Romblon',
    duration: '1 hr',
  },
  {
    title: 'Steelman',
    company: 'Build Company, Inc.',
    address: 'Imus City, Cavite',
    duration: '2 hr',
  },
]

const people = [
  {
    name: 'John Doe',
    expertise: 'Carpenter',
    proximity: '5 m',
    rating: 4.5,
    status: Status.ONLINE,
  },
  {
    name: 'Johnny Kim',
    expertise: 'Landscaper',
    proximity: '1 km',
    rating: 4.7,
    status: Status.IDLE,
  },
  {
    name: 'Bill Gates',
    expertise: 'Plumber',
    proximity: '5 m',
    rating: 4.9,
    status: Status.ONLINE,
  },
  {
    name: 'Mark Zuckerberg',
    expertise: 'Carpenter',
    proximity: '100 m',
    rating: 5.0,
  },
  {
    name: 'Juan de los Reyes',
    expertise: 'Mason',
    proximity: '2m',
    rating: 4.2,
  },
  {
    name: 'Pierre Simon',
    expertise: 'Crane Operator',
    proximity: '2m',
    rating: 4.8,
    status: Status.IDLE,
  },
  {
    name: 'Simon Cade',
    expertise: 'Roofer',
    proximity: '2m',
    rating: 4.6,
  },
]

export default function Home() {
  useRenderCount('Index')

  const styles = useStyles()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState<UserSchema[]>([])
  const [hasError, setHasError] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(isEmployer() ? 'tradespeople' : 'employers')
      .onSnapshot(
        (querySnapshot) => {
          const entries: UserSchema[] = []

          // biome-ignore lint/complexity/noForEach:
          querySnapshot.forEach((documentSnapshot) => {
            entries.push({
              ...(documentSnapshot.data() as UserSchema),
              key: documentSnapshot.id,
            })
          })

          setEntries(entries)
          setIsLoading(false)
        },
        (error) => {
          console.error(error)
          setHasError(true)
        }
      )

    return () => unsubscribe()
  }, [hasError])

  return (
    <>
      <ClPageView
        scrollable={false}
        title={isEmployer() ? 'Tradespeople' : 'Jobs'}
        contentContainerStyle={{
          paddingBottom: Spacing[20],
        }}
      >
        <ClTextInput
          size="small"
          left={<Feather name="search" />}
          placeholder={`Search ${isEmployer() ? 'tradespeople' : 'trade jobs'}`}
          readOnly
          onPress={() => router.navigate('/(main)/(user)/search')}
        />
        <FlatList
          data={entries}
          contentContainerStyle={styles.entries}
          renderItem={({ item }) => (
            <TradespersonCard
              userId={item.key}
              name={joinNames(item.firstName, item.lastName) as string}
              expertise="Carpenter"
              proximity="5 m"
              rating={4.9}
            />
          )}
        />
      </ClPageView>
      {hasError && (
        <ClAlert
          visible={true}
          title="Loading failed"
          description="It seems your network connection is lost."
          state={AlertState.ERROR}
          rightButton={{
            text: 'Retry',
            onPress: () => {
              setIsLoading(true)
              setHasError(false)
            },
          }}
        />
      )}
      {isLoading && <ClSpinner transluscent />}
    </>
  )
}

const useStyles = createStyles(({ spacing }) => ({
  searchContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  entries: {
    gap: spacing[3],
    marginBottom: spacing[5],
  },
}))
