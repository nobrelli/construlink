import { CustomStack } from '@/components/navigation/CustomStack'
import { SkinnedSpinner } from '@/components/skinned/SkinnedSpinner'
import { useRenderCount } from '@/hooks/useRenderCount'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function MainLayout() {
  useRenderCount('MainLayout')

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
  })

  useEffect(() => {
    if (fontsError) throw fontsError
  }, [fontsError])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => {
        console.info('App loaded')
      })
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <SkinnedSpinner />
  }

  return (
    <CustomStack>
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </CustomStack>
  )
}
