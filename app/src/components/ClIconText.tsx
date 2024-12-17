import { createStyles } from '@/helpers/createStyles'
import { IconSet, type IconType } from '@/types/Icons'
import { View } from 'react-native'
import { ClIcon } from './ClIcon'
import { ClText, type ClTextProps } from './ClText'

interface ClIconTextProps extends Partial<ClTextProps> {
  icon: IconType
  text: string
}

export function ClIconText({ icon, text }: ClIconTextProps) {
  const styles = useStyles()

  return (
    <View style={styles.row}>
      <ClIcon {...icon} size={styles.icon.size} color={styles.icon.color} />
      <ClText type="helper">{text}</ClText>
    </View>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  row: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
  },
  icon: {
    color: colors.primaryText,
    size: sizes.icon.sm,
  },
}))
