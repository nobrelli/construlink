import { Menu } from '@/components/Menu'
import { PageView } from '@/components/PageView'
import { TradespersonProfileCard } from '@/components/cards/ProfileCard'
import { IconSet } from '@/types/Icons'
import { useLocalSearchParams } from 'expo-router'

export default function ProfileViewer() {
  const { userId } = useLocalSearchParams()

  return (
    <PageView>
      <TradespersonProfileCard name={userId as string} />
      <Menu
        items={[
          {
            title: 'Skills & Services',
            icon: {
              set: IconSet.Ionicons,
              name: 'hammer-outline',
            },
          },
          {
            title: 'Availability',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'clock-outline',
            },
          },
          {
            title: 'Works',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'briefcase-outline',
            },
          },
          {
            title: 'Reviews',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'message-star-outline',
            },
          },
        ]}
      />
    </PageView>
  )
}
