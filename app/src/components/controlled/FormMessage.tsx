import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { Sizes, Spacing } from '@/theme'
import type { UIState } from '@/theme/palette'
import { type GlyphMap, IconSet } from '@/types/Icons'
import { View } from 'react-native'
import { ClIcon } from '../ClIcon'
import { ClText } from '../ClText'

interface FormMessageProps {
  message: string
  state: UIState
}

export function FormMessage({ message, state }: FormMessageProps) {
  const styles = useStyles({ state })
  let iconName: GlyphMap['MaterialIcons']

  switch (state) {
    case 'success':
      iconName = 'check-circle'
      break
    case 'info':
      iconName = 'info'
      break
    case 'warning':
      iconName = 'warning'
      break
    case 'danger':
      iconName = 'dangerous'
      break
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: Spacing[1] }}>
        <ClIcon
          set={IconSet.MaterialIcon}
          name={iconName}
          size={styles.icon.fontSize}
          color={styles.icon.color}
        />
      </View>
      <View style={styles.textWrapper}>
        <ClText style={styles.message}>{message}</ClText>
      </View>
    </View>
  )
}

const useStyles = createStyles(
  ({ spacing, sizes, colors, typo }, { state }: { state: UIState }) => ({
    container: {
      flex: 1,
      flexDirection: 'row',
      gap: spacing[2],
      padding: spacing[4],
      borderRadius: sizes.radius['2xl'],
      backgroundColor: resolveColor(
        colors.states[state][900],
        colors.states[state][50]
      ),
      borderWidth: sizes.borderWidth.thin,
      borderColor: resolveColor(
        colors.states[state][500],
        colors.states[state][400]
      ),
    },
    icon: {
      fontSize: sizes.icon.md,
      color: resolveColor(colors.states[state].base, colors.states[state][700]),
    },
    textWrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    message: {
      color: colors.primaryText,
      fontSize: typo.presets.sm.fontSize,
    },
  })
)
