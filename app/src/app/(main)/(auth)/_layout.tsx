import { ClStack } from '@/components/navigation/ClStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function AuthLayout() {
  useRenderCount('AuthLayout')

  return (
    <ClStack>
      <Stack.Screen name="signin" options={{ title: 'Sign in' }} />
      <Stack.Screen name="signup" options={{ title: 'Create an account' }} />
      <Stack.Screen name="verify" options={{ title: 'Verify' }} />
      <Stack.Screen
        name="(reset)/forgot"
        options={{ title: 'Forgot password' }}
      />
      <Stack.Screen
        name="(reset)/change-pass"
        options={{ title: 'Create new password' }}
      />
      <Stack.Screen name="(reset)/done" options={{ title: '' }} />
      <Stack.Screen name="(signup)/done" options={{ title: '' }} />
    </ClStack>
  )
}
