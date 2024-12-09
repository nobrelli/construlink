import { Logo } from '@/assets/images/logo'
import { ClPageView } from '@/components/ClPageView'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { Spacing } from '@/theme'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function GettingStarted() {
  const styles = useStyles()

  return (
    <>
      <Image
        style={styles.backgroundImage}
        contentFit="cover"
        source={require('@/assets/images/get-started.jpg')}
      />
      <ClPageView contentContainerStyle={styles.container}>
        <View style={styles.greeting}>
          <Logo width={200} height={200} style={{ alignSelf: 'center' }} />
          <View style={styles.heroTextContainer}>
            <ClText type="h2">Welcome to Construlink</ClText>
            <ClText style={styles.subheading}>
              Find the right manpower or trade job for you
            </ClText>
          </View>
        </View>
        <View style={{ gap: Spacing[4] }}>
          <ClTextButton
            text="Create an account"
            size="large"
            onPress={() => router.push('/(main)/(auth)/signup')}
          />
          <ClTextButton
            text="Already a member?"
            size="large"
            variant="outline"
            onPress={() => router.push('/(main)/(auth)/signin')}
          />
        </View>
      </ClPageView>
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
    backgroundColor: resolveColor(colors.modalBackground, '#ffffffd9'),
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
