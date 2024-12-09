import { ClMenu } from '@/components/ClMenu'
import { ClPageView } from '@/components/ClPageView'
import { ClTextButton } from '@/components/ClTextButton'
import { useRenderCount } from '@/hooks/useRenderCount'
import { IconSet } from '@/types/Icons'
import auth from '@react-native-firebase/auth'
import { router } from 'expo-router'
import { Alert } from 'react-native'

export default function Settings() {
  useRenderCount('Settings Screen')

  const handleSignOut = async () => {
    await auth().signOut()
    router.replace('/')
  }

  return (
    <>
      <ClPageView
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
      >
        <ClMenu
          items={[
            {
              title: 'Account & Security',
              icon: {
                set: IconSet.MaterialCommunityIcons,
                name: 'account-outline',
              },
              onPress: () => router.navigate('/(main)/(user)/account'),
            },
            {
              title: 'Notifications',
              icon: {
                set: IconSet.Ionicons,
                name: 'notifications-outline',
              },
              onPress: () => router.navigate('/(main)/(user)/notifications'),
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
              onPress: () => router.navigate('/(main)/(user)/feedback'),
            },
            {
              title: 'Terms & Policies',
              icon: {
                set: IconSet.MaterialCommunityIcons,
                name: 'information-outline',
              },
              onPress: () => router.navigate('/(main)/(user)/terms'),
            },
          ]}
        />
        <ClTextButton
          text="Sign out"
          onPress={() =>
            Alert.alert(
              'Sign out',
              'Are you sure?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: handleSignOut,
                },
              ],
              {
                cancelable: true,
              }
            )
          }
        />
      </ClPageView>
    </>
  )
}
