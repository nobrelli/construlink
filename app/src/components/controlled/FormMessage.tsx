import { createStyles } from '@/helpers/createStyles'
import { Sizes } from '@/theme'
import type { UIState } from '@/theme/palette'
import { type GlyphMap, IconSet } from '@/types/Icons'
import { View } from 'react-native'
import { ClIcon } from '../ClIcon'
import { ClText } from '../ClText'

interface IFormMessageProps {
  message: string
  state: UIState
}

export default ({ message, state }: IFormMessageProps) => {
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
      <ClIcon set={IconSet.MaterialIcon} name={iconName} size={Sizes.icon.md} />
      <View style={styles.textWrapper}>
        <ClText style={styles.message}>{message}</ClText>
      </View>
    </View>
  )
}

const useStyles = createStyles(
  ({ spacing, sizes, colors }, { state }: { state: UIState }) => ({
    container: {
      flex: 1,
      flexDirection: 'row',
      gap: spacing[2],
      padding: spacing[4],
      borderRadius: sizes.radius['2xl'],
      backgroundColor: colors.states[state].base,
    },
    textWrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    message: {
      color: colors.white,
    },
  })
)
