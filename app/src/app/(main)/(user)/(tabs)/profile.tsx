import { Menu } from '@/components/Menu'
import { PageView } from '@/components/PageView'
import { TradespersonProfileCard } from '@/components/cards/ProfileCard'
import { SkinnedText } from '@/components/skinned/SkinnedText'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useRenderCount } from '@/hooks/useRenderCount'
import { IconSet } from '@/types/Icons'

export default function Profile() {
  useRenderCount('Profile')

  const styles = useStyles()

  return (
    <PageView title="Profile">
      <TradespersonProfileCard />
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
