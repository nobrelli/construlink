import { CustomStack } from '@/components/navigation/CustomStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function MainLayout() {
  useRenderCount('MainLayout')

  return (
    <BottomSheetModalProvider>
      <CustomStack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: 'Search' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="create-job" options={{ title: 'Post a Job' }} />

        <Stack.Screen
          name="users/[userId]"
          options={{ title: 'View Profile' }}
        />
      </CustomStack>
    </BottomSheetModalProvider>
  )
}
