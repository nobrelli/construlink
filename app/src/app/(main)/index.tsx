import { Logo } from '@/assets/images/logo'
import { PageView } from '@/components/PageView'
import { SkinnedText } from '@/components/skinned/SkinnedText'
import { SkinnedTextButton } from '@/components/skinned/SkinnedTextButton'
import { createStyles } from '@/helpers/createStyles'
import { Image } from 'expo-image'
import { Redirect, router } from 'expo-router'
import { View } from 'react-native'

export default function GettingStarted() {
  const styles = useStyles()
  // const user = useAuthStore.use.user()

  // if (user) {
  //     return <Redirect href='/(main)/(user)' />
  // }

  return (
    <>
      <Image
        style={styles.backgroundImage}
        contentFit="cover"
        source={require('@/assets/images/get-started.jpg')}
      />
      <PageView contentContainerStyle={styles.container}>
        <View style={styles.greeting}>
          <Logo width={200} height={200} style={{ alignSelf: 'center' }} />
          <View style={styles.heroTextContainer}>
            <SkinnedText type="h2">Welcome to Construlink</SkinnedText>
            <SkinnedText style={styles.subheading}>
              Find the right manpower or trade job for you
            </SkinnedText>
          </View>
        </View>
        <SkinnedTextButton
          text="Get Started"
          size="xlarge"
          onPress={() => router.push('/(main)/(user)/(tabs)/')}
        />
      </PageView>
    </>
  )
}

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    paddingTop: spacing[40],
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: colors.modalBackground,
  },
  greeting: {
    gap: spacing[4],
  },
  heroTextContainer: {
    alignItems: 'center',
    gap: spacing[2.5],
  },
  subheading: {
    textAlign: 'center',
    fontSize: typo.presets.lg.fontSize,
    lineHeight: typo.presets.lg.lineHeight,
  },
}))
