import { useRenderCount } from '@/hooks/useRenderCount'
import { useAppStore } from '@/stores/app'
import { Typo } from '@/theme'
import { Stack } from 'expo-router'
import type { ComponentProps } from 'react'
import { ClBackArrow } from '../ClBackArrow'

export function ClStack(props: ComponentProps<typeof Stack>) {
  useRenderCount('ClStack')

  const { children, screenOptions, ...rest } = props
  const colors = useAppStore((state) => state.colors)

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
        headerLeft: (props) => <ClBackArrow {...props} />,
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
