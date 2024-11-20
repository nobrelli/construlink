import { useThemeStore } from '@/stores/theme'
import { ActivityIndicator, View } from 'react-native'

export function SkinnedSpinner() {
  const colors = useThemeStore((state) => state.colors)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={128} color={colors.accent[500]} />
    </View>
  )
}
