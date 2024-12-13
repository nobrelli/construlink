import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { router } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { ClAvatar } from '../ClAvatar'
import { ClText } from '../ClText'
import type { TradespersonProps } from './TradespersonCard'

export function TradespersonProfileCard(props: Partial<TradespersonProps>) {
  const { name, expertise, proximity, rating, badges, status } = props
  const styles = useStyles()

  const handlePress = () => {
    router.navigate('/(main)/(user)/users/stats')
  }

  return (
    <View style={styles.profileCard}>
      <ClAvatar />
      <View>
        <ClText type="h6" style={styles.name}>
          {name}
        </ClText>
        <ClText type="helper" style={styles.role} dim>
          {expertise}
        </ClText>
      </View>
      {/* Stats */}
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.stat} onPress={handlePress}>
          <ClText type="lead" style={styles.statNumber}>
            32
          </ClText>
          <ClText type="helper" style={styles.statLabel}>
            Job Posts
          </ClText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat} onPress={handlePress}>
          <ClText type="lead" style={styles.statNumber}>
            102
          </ClText>
          <ClText type="helper" style={styles.statLabel}>
            Hired
          </ClText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat} onPress={handlePress}>
          <ClText type="lead" style={styles.statNumber}>
            4.8
          </ClText>
          <ClText type="helper" style={styles.statLabel}>
            Rating
          </ClText>
        </TouchableOpacity>
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
