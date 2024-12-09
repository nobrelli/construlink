import { ClMenu } from '@/components/ClMenu'
import { ClPageView } from '@/components/ClPageView'
import { TradespersonProfileCard } from '@/components/cards/ProfileCard'
import { IconSet } from '@/types/Icons'
import { router, useLocalSearchParams } from 'expo-router'

export default function ProfileViewer() {
  const { userId } = useLocalSearchParams()

  return (
    <ClPageView>
      <TradespersonProfileCard name={userId as string} />
      <ClMenu
        items={[
          {
            title: 'Skills & Services',
            icon: {
              set: IconSet.Ionicons,
              name: 'hammer-outline',
            },
            onPress: () => router.navigate('/(main)/(user)/users/skills'),
          },
          {
            title: 'Availability',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'clock-outline',
            },
            onPress: () => router.navigate('/(main)/(user)/users/schedule'),
          },
          {
            title: 'Works',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'briefcase-outline',
            },
            onPress: () => router.navigate('/(main)/(user)/users/works'),
          },
          {
            title: 'Reviews',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'message-star-outline',
            },
            onPress: () => router.navigate('/(main)/(user)/users/reviews'),
          },
        ]}
      />
    </ClPageView>
  )
}
