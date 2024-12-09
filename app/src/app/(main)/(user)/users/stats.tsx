import { ClPageView } from '@/components/ClPageView'
import { ClText } from '@/components/ClText'
import { type StatItem, StatsView } from '@/components/StatsView'
import { IconSet } from '@/types/Icons'

const tradespeopleStats: StatItem[] = [
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Jobs Completed',
    value: 12,
  },
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Active Job Applications',
    value: 12,
  },
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Average Rating',
    value: 4.8,
  },
]

const employerStats: StatItem[] = [
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Jobs Posted',
    value: 12,
  },
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Jobs Filled',
    value: 10,
  },
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Active Job Listings',
    value: 2,
  },
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Tradespeople Hired',
    value: 10,
  },
  {
    icon: {
      set: IconSet.MaterialCommunityIcons,
      name: 'briefcase-outline',
    },
    label: 'Average Rating',
    value: 4.5,
  },
]

export default function Stats() {
  return (
    <ClPageView scrollable={false}>
      <StatsView items={employerStats} />
    </ClPageView>
  )
}
