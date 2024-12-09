import { ClPageView } from '@/components/ClPageView'
import { ClTextButton } from '@/components/ClTextButton'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { createStyles } from '@/helpers/createStyles'
import type { ChangePasswordFields } from '@/types/Fields'
import { router } from 'expo-router'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { type TextInput, View } from 'react-native'

export default function ChangePassword() {
  const styles = useStyles()
  const { control, handleSubmit } = useForm<ChangePasswordFields>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })
  const confirmPasswordRef = useRef<TextInput>(null)

  return (
    <ClPageView subtitle="Your new password must be different from your previous one.">
      <View style={styles.form}>
        <ControlledTextInput
          name="newPassword"
          control={control}
          rules={{
            required: true,
          }}
          textInputOptions={{
            label: 'New password',
            passwordMode: true,
            placeholder: '********',
            returnKeyType: 'done',
            nextInput: confirmPasswordRef,
          }}
        />
        <ControlledTextInput
          name="confirmPassword"
          control={control}
          rules={{
            required: true,
          }}
          textInputOptions={{
            label: 'Confirm password',
            passwordMode: true,
            placeholder: '********',
            returnKeyType: 'done',
            ref: confirmPasswordRef,
          }}
        />
        <ClTextButton
          text="Change password"
          onPress={() => router.navigate('/(main)/(auth)/(reset)/done')}
          // onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ClPageView>
  )
}

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  form: {
    gap: spacing[6],
  },
}))
