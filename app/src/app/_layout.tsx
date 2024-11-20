import { useRenderCount } from '@/hooks/useRenderCount'
import { useScheme } from '@/hooks/useScheme'
import { useThemeStore } from '@/stores/theme'
import { Palette } from '@/theme'
import { useUpdateEffect } from '@reactuses/core'
import * as NavigationBar from 'expo-navigation-bar'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import * as SystemUI from 'expo-system-ui'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useRenderCount('RootLayout')

  const OS = Platform.OS
  const scheme = useScheme()
  const changeScheme = useThemeStore((state) => state.changeScheme)

  if (OS === 'android' || OS === 'ios') {
    SystemUI.setBackgroundColorAsync(Palette[scheme].background)
    NavigationBar.setBackgroundColorAsync(Palette[scheme].background)
  }

  useUpdateEffect(() => {
    changeScheme(scheme)
  }, [scheme])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
