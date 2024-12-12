import { ClSpinner } from '@/components/ClSpinner'
import { ClStack } from '@/components/navigation/ClStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { AccountService } from '@/services/account'
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
  const { user, role, setUser, setRole } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      role: state.role,
      setUser: state.setUser,
      setRole: state.setRole
    }))
  )

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      setUser(user)

      if (!role) {
        const role = await AccountService.getRole(user.uid)
        console.log(role)
        setRole(role)
      }
    }

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
