import { Menu } from '@/components/Menu'
import { PageView } from '@/components/PageView'
import { SkinnedTextButton } from '@/components/skinned/SkinnedTextButton'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { IconSet } from '@/types/Icons'

export default function Settings() {
  useRenderCount('Settings Screen')

  const styles = useStyles()

  return (
    <PageView
      contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
    >
      <Menu
        items={[
          {
            title: 'Account & Security',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'account-outline',
            },
          },
          {
            title: 'Notifications',
            icon: {
              set: IconSet.Ionicons,
              name: 'notifications-outline',
            },
          },
          {
            title: 'Theme',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'theme-light-dark',
            },
          },
          {
            title: 'Feedback',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'message-outline',
            },
          },
          {
            title: 'Terms & Policies',
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'information-outline',
            },
          },
        ]}
      />
      <SkinnedTextButton text="Sign out" />
    </PageView>
  )
}

const useStyles = createStyles(({ colors, typo, spacing }) => ({}))
