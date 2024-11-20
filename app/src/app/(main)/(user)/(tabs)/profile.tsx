import { Menu } from '@/components/Menu'
import { PageView } from '@/components/PageView'
import { SkinnedText } from '@/components/skinned/SkinnedText'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useRenderCount } from '@/hooks/useRenderCount'
import { IconSet } from '@/types/Icons'
import { Image } from 'expo-image'
import { View } from 'react-native'

export default function Profile() {
  useRenderCount('Profile')

  const styles = useStyles()

  return (
    <PageView title="Profile">
      <View style={styles.profileCard}>
        <View style={styles.avatarCropper}>
          <Image
            source={require('@/assets/images/john.jpg')}
            style={styles.avatar}
          />
        </View>
        <View>
          <SkinnedText type="h6" style={styles.name}>
            John Wick
          </SkinnedText>
          <SkinnedText type="helper" style={styles.role}>
            Employer
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
      {/* Overview */}
      <Menu
        items={[
          {
            title: 'Job Posts',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'briefcase-variant-outline',
            },
            right: <SkinnedText dim>32</SkinnedText>,
          },
          {
            title: 'People Hired',
            icon: {
              set: IconSet.Ionicons,
              name: 'hammer-outline',
            },
            right: <SkinnedText dim>102</SkinnedText>,
          },
        ]}
      />
    </PageView>
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
  avatarCropper: {
    width: sizes.avatar.xl,
    height: sizes.avatar.xl,
    borderRadius: sizes.radius.full,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
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
  overview: {
    overflow: 'hidden',
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
    borderWidth: sizes.borderWidth.thin,
    borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
  },
  overviewItem: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: sizes.borderWidth.thin,
    borderTopColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewLeft: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  overviewIcon: {
    color: resolveColor(colors.neutral[100], colors.neutral[100]),
    fontSize: typo.presets['2xl'].fontSize,
  },
}))
