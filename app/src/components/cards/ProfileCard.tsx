import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { View } from 'react-native'
import { Avatar } from '../Avatar'
import { SkinnedText } from '../skinned/SkinnedText'
import type { TradespersonProps } from './TradespersonCard'

export function TradespersonProfileCard(props: Partial<TradespersonProps>) {
  const { name, expertise, proximity, rating, badges, status } = props
  const styles = useStyles()

  return (
    <View style={styles.profileCard}>
      <Avatar />
      <View>
        <SkinnedText type="h6" style={styles.name}>
          {name}
        </SkinnedText>
        <SkinnedText type="helper" style={styles.role}>
          {expertise}
        </SkinnedText>
      </View>
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <SkinnedText type="lead" style={styles.statNumber}>
            32
          </SkinnedText>
          <SkinnedText type="helper" style={styles.statLabel}>
            Job Posts
          </SkinnedText>
        </View>
        <View style={styles.stat}>
          <SkinnedText type="lead" style={styles.statNumber}>
            102
          </SkinnedText>
          <SkinnedText type="helper" style={styles.statLabel}>
            Hired
          </SkinnedText>
        </View>
        <View style={styles.stat}>
          <SkinnedText type="lead" style={styles.statNumber}>
            4.8
          </SkinnedText>
          <SkinnedText type="helper" style={styles.statLabel}>
            Rating
          </SkinnedText>
        </View>
      </View>
    </View>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  profileCard: {
    alignItems: 'center',
    gap: spacing[4],
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    paddingVertical: spacing[4],
    borderRadius: sizes.radius['2xl'],
    borderWidth: sizes.borderWidth.thin,
    borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
  },
  name: {
    fontFamily: typo.family.bold,
    textAlign: 'center',
  },
  role: {
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingTop: spacing[4],
    borderTopWidth: sizes.borderWidth.thin,
    borderTopColor: resolveColor(colors.neutral[700], colors.neutral[200]),
  },
  stat: {
    flex: 1,
  },
  statNumber: {
    textAlign: 'center',
    fontFamily: typo.family.bold,
  },
  statLabel: {
    textAlign: 'center',
  },
}))
