import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

export function ClCard({ children }: PropsWithChildren) {
  const styles = useStyles()

  return <View style={styles.card}>{children}</View>
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  card: {
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
    borderWidth: sizes.borderWidth.thin,
    borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[4],
  },
}))
