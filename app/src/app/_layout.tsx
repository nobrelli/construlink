import { ClSpinner } from '@/components/ClSpinner'
import { useRenderCount } from '@/hooks/useRenderCount'
import { useScheme } from '@/hooks/useScheme'
import { AccountService } from '@/services/account'
import { useThemeStore } from '@/stores/theme'
import { Palette } from '@/theme'
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { useUpdateEffect } from '@reactuses/core'
import { useFonts } from 'expo-font'
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

// Start services
AccountService.getInstance()

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
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FontsLoader />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

function FontsLoader() {
  useRenderCount('FontsLoader')

  const [fontsLoaded, fontsError] = useFonts({
    thin: require('@/assets/fonts/montserrat/montserrat-latin-100-normal.ttf'),
    extraLight: require('@/assets/fonts/montserrat/montserrat-latin-200-normal.ttf'),
    light: require('@/assets/fonts/montserrat/montserrat-latin-300-normal.ttf'),
    regular: require('@/assets/fonts/montserrat/montserrat-latin-400-normal.ttf'),
    medium: require('@/assets/fonts/montserrat/montserrat-latin-500-normal.ttf'),
    semiBold: require('@/assets/fonts/montserrat/montserrat-latin-600-normal.ttf'),
    bold: require('@/assets/fonts/montserrat/montserrat-latin-700-normal.ttf'),
    extraBold: require('@/assets/fonts/montserrat/montserrat-latin-800-normal.ttf'),
    black: require('@/assets/fonts/montserrat/montserrat-latin-900-normal.ttf'),
    ...MaterialCommunityIcons.font,
    ...MaterialIcons.font,
    ...Ionicons.font,
    ...AntDesign.font,
  })

  useUpdateEffect(() => {
    if (fontsError) throw fontsError
  }, [fontsError])

  if (!fontsLoaded) {
    return <ClSpinner />
  }

  return <Slot />
}
