import { MaterialIcons as Icon } from '@expo/vector-icons'
import { router } from 'expo-router'
import { type ColorValue, TouchableOpacity } from 'react-native'

interface ClBackArrowProps {
  tintColor?: ColorValue | string
  canGoBack?: boolean
}

export function ClBackArrow({ tintColor, canGoBack }: ClBackArrowProps) {
  return canGoBack ? (
    <TouchableOpacity onPress={() => router.back()}>
      <Icon name="chevron-left" size={44} color={tintColor} />
    </TouchableOpacity>
  ) : null
}
