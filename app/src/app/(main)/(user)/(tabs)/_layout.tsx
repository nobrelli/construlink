import { ClTabBar, type ClTabOption } from '@/components/navigation/ClTabBar'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { isEmployer } from '@/stores/auth'
import { IconSet } from '@/types/Icons'
import { Ionicons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  type EdgeInsets,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

export const unstable_settings = {
  initialRouteName: 'index',
}

const UserLayout = () => {
  useRenderCount('UserLayout')

  const insets = useSafeAreaInsets()
  const styles = useStyles({ insets })

  const options: ClTabOption[] = useMemo(
    () => [
      {
        routeName: 'search',
        icon: {
          outline: isEmployer()
            ? {
                set: IconSet.Ionicons,
                name: 'hammer-outline',
              }
            : {
                set: IconSet.MaterialCommunityIcons,
                name: 'briefcase-search-outline',
              },
          filled: isEmployer()
            ? {
                set: IconSet.Ionicons,
                name: 'hammer',
              }
            : {
                set: IconSet.MaterialCommunityIcons,
                name: 'briefcase-search',
              },
        },
        shown: true,
      },
      {
        routeName: 'schedule',
        icon: {
          outline: {
            set: IconSet.MaterialCommunityIcons,
            name: 'calendar-clock-outline',
          },
          filled: {
            set: IconSet.MaterialCommunityIcons,
            name: 'calendar-clock',
          },
        },
        shown: true,
      },
      {
        routeName: 'jobs',
        icon: {
          outline: {
            set: IconSet.MaterialCommunityIcons,
            name: 'newspaper-variant-outline',
          },
          filled: {
            set: IconSet.MaterialCommunityIcons,
            name: 'newspaper-variant',
          },
        },
        shown: isEmployer(),
      },
      {
        routeName: 'profile',
        icon: {
          outline: {
            set: IconSet.MaterialCommunityIcons,
            name: 'account-circle-outline',
          },
          filled: {
            set: IconSet.MaterialCommunityIcons,
            name: 'account-circle',
          },
        },
        shown: true,
      },
    ],
    []
  )

  return (
    <Tabs
      tabBar={(props) => <ClTabBar {...props} options={options} />}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="schedule"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.navigate('/(main)/(user)/settings')}
            >
              <Ionicons
                name="settings-outline"
                color={styles.settingsIcon.color}
                size={styles.settingsIcon.fontSize}
              />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: styles.headerRightContainer,
        }}
      />
    </Tabs>
  )
}

const useStyles = createStyles(
  ({ colors, sizes, spacing }, { insets }: { insets: EdgeInsets }) => ({
    sceneContainer: {
      backgroundColor: colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    headerRightContainer: {
      paddingRight: spacing[4],
      paddingTop: spacing[2],
    },
    settingsIcon: {
      color: colors.primaryText,
      fontSize: sizes.icon.md,
    },
  })
)

export default UserLayout
