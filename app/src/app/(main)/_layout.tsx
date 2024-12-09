import { ClSpinner } from '@/components/ClSpinner'
import { ClStack } from '@/components/navigation/ClStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { useAuthStore } from '@/stores/auth'
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useMount, useUpdateEffect } from '@reactuses/core'
import { Stack, router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function MainLayout() {
  useRenderCount('MainLayout')

  const [initializing, setInitializing] = useState(true)
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  )

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user)

    if (initializing) {
      setInitializing(false)
    }
  }

  useMount(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  })

  useUpdateEffect(() => {
    if (!initializing) SplashScreen.hideAsync()
  }, [initializing])

  useUpdateEffect(() => {
    if (user) router.replace('/(main)/(tabs)/')
  }, [user])

  if (initializing) {
    return <ClSpinner />
  }

  return (
    <ClStack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </ClStack>
  )
}
