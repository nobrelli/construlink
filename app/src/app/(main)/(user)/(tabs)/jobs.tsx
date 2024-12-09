import { ClIcon } from '@/components/ClIcon'
import { ClPageView } from '@/components/ClPageView'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useScheme } from '@/hooks/useScheme'
import { IconSet } from '@/types/Icons'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function Jobs() {
  const styles = useStyles()
  const scheme = useScheme()

  return (
    <ClPageView title="Job Posts">
      <View style={styles.emptyPlaceholder}>
        <ClIcon
          set={IconSet.MaterialCommunityIcons}
          name="newspaper-variant-outline"
          color={styles.heroIcon.color}
          size={styles.heroIcon.fontSize}
        />
        <View style={styles.encouragement}>
          <ClText type="lead" style={styles.heroText}>
            Create a job post now!
          </ClText>
          <ClText type="helper" dim>
            You can manage your posted jobs here.
          </ClText>
        </View>
        <ClTextButton
          text="Post a Job"
          onPress={() => router.navigate('/(main)/(user)/create-job')}
        />
      </View>
    </ClPageView>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  emptyPlaceholder: {
    alignItems: 'center',
    gap: spacing[4],
    marginTop: spacing[20],
  },
  heroIcon: {
    fontSize: sizes.icon['4xl'],
    color: resolveColor(colors.neutral[700], colors.neutral[300]),
  },
  encouragement: {
    alignItems: 'center',
  },
  heroText: {
    fontFamily: typo.family.semiBold,
  },
}))
