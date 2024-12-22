import { Logo } from '@/assets/images/logo'
import { AlertState, ClAlert } from '@/components/ClAlert'
import { ClLinkText } from '@/components/ClLinkText'
import { ClPageView } from '@/components/ClPageView'
import { ClSpinner } from '@/components/ClSpinner'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { createStyles } from '@/helpers/createStyles'
import patterns from '@/helpers/patterns'
import { resolveColor } from '@/helpers/resolveColor'
import { AccountService } from '@/services/account'
import { useAuthStore } from '@/stores/auth'
import { Spacing } from '@/theme'
import type { SignInFields } from '@/types/Fields'
import { router } from 'expo-router'
import type React from 'react'
import { useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type GestureResponderEvent, type TextInput, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'

export default function Signin() {
  const styles = useStyles()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<SignInFields>({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  })
  const [isUsingPhoneNumber, setIsUsingPhoneNumber] = useState(false)
  const passwordRef = useRef<TextInput>(null)
  const { setRole, setUser } = useAuthStore(
    useShallow((state) => ({
      setRole: state.setRole,
      setUser: state.setUser,
    }))
  )

  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    passwordRef.current?.blur()

    const { userCredential, errorMessage } = await AccountService.emailSignIn(
      data.email,
      data.password
    )

    if (userCredential) {
      const role = await AccountService.getRole(userCredential.user.uid)

      setUser(userCredential.user)
      setRole(role)

      router.replace('/(main)/(tabs)/')
    } else {
      setError('root.signin', {
        message: errorMessage,
        type: 'signin',
      })
    }
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
    <>
      <ClPageView
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
      >
        <View style={styles.mainView}>
          <Logo width={100} height={100} style={{ alignSelf: 'center' }} />
          <View style={styles.form}>
            <View style={{ gap: Spacing[2] }}>
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
              <ClTextButton
                variant="ghost"
                size="small"
                textStyle={styles.switcher}
                onPress={switchToEmailOrPhone}
                text={`Use ${isUsingPhoneNumber ? 'email' : 'phone number'} instead`}
              />
            </View>
            <View style={styles.passwordField}>
              <ControlledTextInput
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                textInputOptions={{
                  label: 'Password',
                  passwordMode: true,
                  placeholder: '********',
                  returnKeyType: 'done',
                  ref: passwordRef,
                }}
              />
              <ClLinkText
                href="/(main)/(auth)/(reset)/forgot"
                linkStyle={{ alignSelf: 'flex-end' }}
                style={styles.forgotPass}
              >
                Forgot your password?
              </ClLinkText>
            </View>
            <ClTextButton text="Sign in" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
        <ClText style={{ alignSelf: 'center' }}>
          Don't have an account?{' '}
          <ClLinkText href="/(auth)/signup">Create one</ClLinkText>
        </ClText>
      </ClPageView>
      {errors.root?.signin && (
        <ClAlert
          visible={true}
          title="Sign in failed"
          description={errors.root.signin.message}
          state={AlertState.ERROR}
          primaryButton={{
            text: 'Retry',
            onPress: () => clearErrors('root'),
          }}
        />
      )}
      {isSubmitting && <ClSpinner transluscent />}
    </>
  )
}

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  mainView: {
    gap: spacing[4],
  },
  form: {
    gap: spacing[6],
  },
  passwordField: {
    gap: spacing[2],
  },
  forgotPass: {
    color: colors.secondaryText,
    fontSize: typo.presets.sm.fontSize,
  },
  switcher: {
    color: resolveColor(colors.accent[500], colors.brand[600]),
  },
}))
