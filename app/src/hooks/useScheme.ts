import type { Scheme } from '@/theme/palette'
import { usePreferredColorScheme } from '@reactuses/core'
import { Appearance, Platform, useColorScheme } from 'react-native'

export function useScheme() {
  return (
    Platform.OS === 'web'
      ? usePreferredColorScheme(Appearance.getColorScheme() ?? undefined)
      : useColorScheme()
  ) as Scheme
}
