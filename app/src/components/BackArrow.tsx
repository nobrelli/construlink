import { MaterialIcons as Icon } from '@expo/vector-icons'
import { router } from 'expo-router'
import { type ColorValue, TouchableOpacity } from 'react-native'

interface IBackArrowProps {
  tintColor?: ColorValue | string
  canGoBack?: boolean
}

export function BackArrow({ tintColor, canGoBack }: IBackArrowProps) {
  return canGoBack ? (
    <TouchableOpacity onPress={() => router.back()}>
      <Icon name="chevron-left" size={48} color={tintColor} />
    </TouchableOpacity>
  ) : null
}
