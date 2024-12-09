import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useThemeStore } from '@/stores/theme'
import { ActivityIndicator } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

export function ClSpinner({ transluscent }: { transluscent?: boolean }) {
  const styles = useStyles({ transluscent })
  const colors = useThemeStore((state) => state.colors)

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <ActivityIndicator
        size={128}
        color={resolveColor(colors.accent[500], colors.brand[500])}
      />
    </Animated.View>
  )
}

const useStyles = createStyles(
  (
    { colors, spacing, typo },
    { transluscent }: { transluscent?: boolean }
  ) => ({
    container: {
      backgroundColor: transluscent
        ? colors.modalBackground
        : colors.background,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      zIndex: 999,
      width: '100%',
      height: '100%',
    },
  })
)
