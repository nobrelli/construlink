import { JobCard } from '@/components/JobCard'
import { PageView } from '@/components/PageView'
import { SkinnedTextInput } from '@/components/skinned/SkinnedTextInput'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
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

export default function Home() {
  useRenderCount('Index')

  const styles = useStyles()
  const router = useRouter()

  return (
    <PageView title="Jobs">
      <SkinnedTextInput
        size="small"
        left={<Feather name="search" />}
        placeholder="Search trade jobs"
        onFocus={() => null}
        onPress={() => router.navigate('/(main)/(user)/search')}
      />
      <View style={styles.jobsList}>
        {data.map((job, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:
          <JobCard key={index} {...job} />
        ))}
      </View>
    </PageView>
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
