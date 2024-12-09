import { useRenderCount } from '@/hooks/useRenderCount'
import { useThemeStore } from '@/stores/theme'
import { Typo } from '@/theme'
import { Stack } from 'expo-router'
import type { ComponentProps } from 'react'
import { ClBackArrow } from '../ClBackArrow'

export function ClStack(props: ComponentProps<typeof Stack>) {
  useRenderCount('ClStack')

  const { children, screenOptions, ...rest } = props
  const colors = useThemeStore((state) => state.colors)

  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primaryText,
        headerShadowVisible: false,
        // IDK why this doesn't work in Expo development build
        // headerLeft: (props) => <BackArrow {...props} />,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: Typo.family.bold,
        },
        ...screenOptions,
      }}
      {...rest}
    >
      {children}
    </Stack>
  )
}
