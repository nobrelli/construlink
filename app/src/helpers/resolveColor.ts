import { useThemeStore } from '@/stores/theme'
import type { ColorValue } from 'react-native'

export function resolveColor(
  forDark: ColorValue,
  forLight: ColorValue
): ColorValue {
  return useThemeStore.getState().mode === 'dark' ? forDark : forLight
}
