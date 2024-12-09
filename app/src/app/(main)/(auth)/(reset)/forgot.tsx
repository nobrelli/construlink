import { ClLinkText } from '@/components/ClLinkText'
import { ClPageView } from '@/components/ClPageView'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { createStyles } from '@/helpers/createStyles'
import patterns from '@/helpers/patterns'
import { resolveColor } from '@/helpers/resolveColor'
import { useAuthStore } from '@/stores/auth'
import type { ForgotPasswordFields } from '@/types/Fields'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type GestureResponderEvent, type TextInput, View } from 'react-native'

export default function Forgot() {
  const styles = useStyles()

  const { control, register, handleSubmit, reset } =
    useForm<ForgotPasswordFields>({
      defaultValues: {
        email: '',
        phone: '',
      },
    })
  const [isUsingPhoneNumber, setIsUsingPhoneNumber] = useState(false)
  const passwordRef = useRef<TextInput>(null)
  const setCredentialToVerify = useAuthStore(
    (state) => state.setCredentialToVerify
  )

  const onSubmit: SubmitHandler<ForgotPasswordFields> = ({ email, phone }) => {
    setCredentialToVerify(isUsingPhoneNumber ? phone : email)
    router.navigate('/(main)/(auth)/verify')
  }

  const switchToEmailOrPhone = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | GestureResponderEvent
  ) => {
    event.preventDefault()
    setIsUsingPhoneNumber(!isUsingPhoneNumber)
    reset()
  }

  return (
    <ClPageView subtitle="Don't worry. We'll send you a verification code to reset your password.">
      <View style={styles.form}>
        {isUsingPhoneNumber ? (
          <ControlledTextInput
            // mask="[0000] [000] [0000]"
            name="phone"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: patterns.phone,
                message: 'Enter a valid phone number.',
              },
            }}
            textInputOptions={{
              label: 'Phone number',
              placeholder: '0912 345 6789',
              keyboardType: 'phone-pad',
              returnKeyType: 'next',
              nextInput: passwordRef,
            }}
          />
        ) : (
          <ControlledTextInput
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: patterns.email,
                message: 'Enter a valid email.',
              },
            }}
            textInputOptions={{
              label: 'Email',
              placeholder: 'juandelacruz@gmail.com',
              keyboardType: 'email-address',
              returnKeyType: 'next',
              nextInput: passwordRef,
            }}
          />
        )}
        <View style={styles.submit}>
          <ClTextButton text="Send code" onPress={handleSubmit(onSubmit)} />
          <ClTextButton
            variant="ghost"
            onPress={switchToEmailOrPhone}
            text={`Use ${isUsingPhoneNumber ? 'email' : 'phone number'} instead`}
            textStyle={styles.switcher}
          />
        </View>
      </View>
      <ClText style={{ alignSelf: 'center' }}>
        Back to <ClLinkText href="/(main)/(auth)/signin">Sign in</ClLinkText>
      </ClText>
    </ClPageView>
  )
}

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  form: {
    gap: spacing[6],
  },
  passwordField: {
    gap: spacing[2],
  },
  submit: {
    gap: spacing[4],
  },
  forgotPass: {
    color: colors.secondaryText,
  },
  switcher: {
    color: resolveColor(colors.accent[500], colors.brand[600]),
  },
}))
