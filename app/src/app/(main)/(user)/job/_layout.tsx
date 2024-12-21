import { ClStack } from '@/components/navigation/ClStack'
import { useRenderCount } from '@/hooks/useRenderCount'
import { Stack } from 'expo-router'

export default function UserLayout() {
  useRenderCount('UserLayout')

  return (
    <ClStack>
      <Stack.Screen name="select" options={{ title: 'Select Job' }} />
      <Stack.Screen name="create" options={{ title: 'Post a Job' }} />
      <Stack.Screen name="description-editor"
        options={{
          title: 'Edit',
          presentation: 'modal',
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen name="preview" options={{ title: 'Preview' }} />
      <Stack.Screen name="submitted" options={{ title: '' }} />
    </ClStack>
  )
}