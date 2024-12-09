import { ClPageView } from '@/components/ClPageView'
import { ClTextInput } from '@/components/ClTextInput'
import {
  TradespersonCard,
  type TradespersonProps,
} from '@/components/cards/TradespersonCard'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { isEmployer } from '@/stores/auth'
import { Spacing } from '@/theme'
import { Status } from '@/types/Enums'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

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

const people: TradespersonProps[] = [
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

  return (
    <ClPageView
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
      <View style={styles.jobsList}>
        {people.map((person, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:
          <TradespersonCard key={index} {...person} />
        ))}
      </View>
    </ClPageView>
  )
}

const useStyles = createStyles(({ spacing }) => ({
  searchContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  jobsList: {
    gap: spacing[3],
    marginBottom: spacing[5],
  },
}))
