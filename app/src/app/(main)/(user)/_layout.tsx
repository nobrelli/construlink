import { CustomStack } from '@/components/navigation/CustomStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function MainLayout() {
  useRenderCount('MainLayout')

  return (
    <CustomStack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ title: 'Search' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />

      <Stack.Screen name="create-job" options={{ title: 'Post a Job' }} />
    </CustomStack>
  )
}
