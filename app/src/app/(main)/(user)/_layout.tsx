import { ClStack } from '@/components/navigation/ClStack'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useRenderCount } from '@/hooks/useRenderCount'
import { Spacing } from '@/theme'
import { Toasts } from '@backpackapp-io/react-native-toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function UserLayout() {
  useRenderCount('UserLayout')

  const styles = useStyles()

  return (
    <BottomSheetModalProvider>
      <ClStack initialRouteName="job">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: 'Search' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen
          name="account"
          options={{ title: 'Account & Security' }}
        />
        <Stack.Screen
          name="notifications"
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen name="feedback" options={{ title: 'Feedback' }} />

        <Stack.Screen name="[userId]" options={{ title: 'View Profile' }} />
        <Stack.Screen name="stats" options={{ title: 'Stats' }} />
        <Stack.Screen
          name="skills"
          options={{ title: 'Skills & Services' }}
        />
        <Stack.Screen name="schedule" options={{ title: 'Schedule' }} />
        <Stack.Screen name="works" options={{ title: 'Works' }} />
        <Stack.Screen name="reviews" options={{ title: 'Reviews' }} />
        <Stack.Screen name="job" options={{ headerShown: false }} />
        <Stack.Screen name="company/create" options={{ title: 'Create company' }} />
      </ClStack>
      <Toasts
        defaultStyle={{
          pressable: styles.toastPressable,
          text: styles.toastText,
        }}
        extraInsets={{
          bottom: Spacing[8],
        }}
      />
    </BottomSheetModalProvider>
  )
}

const useStyles = createStyles(({ colors, typo, sizes }) => ({
  toastPressable: {
    backgroundColor: resolveColor(colors.neutral[600], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
  },
  toastText: {
    color: colors.primaryText,
    fontFamily: typo.family.semiBold,
  },
}))
