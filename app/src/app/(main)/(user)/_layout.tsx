import { ClStack } from '@/components/navigation/ClStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function UserLayout() {
  useRenderCount('UserLayout')

  return (
    <BottomSheetModalProvider>
      <ClStack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: 'Search' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="create-job" options={{ title: 'Post a Job' }} />
        <Stack.Screen
          name="account"
          options={{ title: 'Account & Security' }}
        />
        <Stack.Screen
          name="notifications"
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen name="feedback" options={{ title: 'Feedback' }} />
        <Stack.Screen name="terms" options={{ title: 'Terms & Policies' }} />

        <Stack.Screen
          name="users/[userId]"
          options={{ title: 'View Profile' }}
        />
        <Stack.Screen name="users/stats" options={{ title: 'Stats' }} />
        <Stack.Screen
          name="users/skills"
          options={{ title: 'Skills & Services' }}
        />
        <Stack.Screen name="users/schedule" options={{ title: 'Schedule' }} />
        <Stack.Screen name="users/works" options={{ title: 'Works' }} />
        <Stack.Screen name="users/reviews" options={{ title: 'Reviews' }} />
      </ClStack>
    </BottomSheetModalProvider>
  )
}
