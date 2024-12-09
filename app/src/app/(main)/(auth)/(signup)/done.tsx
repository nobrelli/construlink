import { ClIcon } from '@/components/ClIcon'
import { ClPageView } from '@/components/ClPageView'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { IconSet } from '@/types/Icons'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function PasswordChanged() {
  const styles = useStyles()

  return (
    <ClPageView>
      <View style={styles.container}>
        <ClIcon
          set={IconSet.MaterialCommunityIcons}
          name="check-circle-outline"
          color={styles.icon.color}
          size={styles.icon.fontSize}
        />
        <ClText type="h2">Success!</ClText>
        <ClText dim style={{ textAlign: 'center' }}>
          Your account has been created.
        </ClText>
      </View>
      <ClTextButton
        text="Continue"
        onPress={() => router.replace('/(user)/(tabs)/')}
      />
    </ClPageView>
  )
}

const useStyles = createStyles(({ colors, spacing, typo, sizes }) => ({
  container: {
    alignItems: 'center',
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  icon: {
    color: resolveColor(colors.states.success.base, colors.states.success[600]),
    fontSize: sizes.icon['4xl'],
  },
}))
