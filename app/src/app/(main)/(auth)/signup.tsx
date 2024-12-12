import { AlertState, ClAlert } from '@/components/ClAlert'
import { ClLinkText } from '@/components/ClLinkText'
import { ClPageView } from '@/components/ClPageView'
import { ClRadioInput, type RadioOption } from '@/components/ClRadio'
import { ClSpinner } from '@/components/ClSpinner'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { createStyles } from '@/helpers/createStyles'
import patterns from '@/helpers/patterns'
import { resolveColor } from '@/helpers/resolveColor'
import { AccountService } from '@/services/account'
import { useAuthStore } from '@/stores/auth'
import { Spacing, Typo } from '@/theme'
import { Role } from '@/types/Enums'
import type { SignUpFields } from '@/types/Fields'
import type { ReactNativeFirebase } from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import {
  Controller,
  type SubmitHandler,
  type Validate,
  useForm,
} from 'react-hook-form'
import { type GestureResponderEvent, type TextInput, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'

const options: RadioOption[] = [
  {
    label: 'Tradesperson',
    value: 'tradesperson',
  },
  {
    label: 'Employer',
    value: 'employer',
  },
]

const passwordValidators: Record<string, Validate<string, SignUpFields>> = {
  hasUpperCase: (value) =>
    (value && /[A-Z]/.test(value)) || 'Must contain an uppercase letter.',
  hasLowerCase: (value) =>
    (value && /[a-z]/.test(value)) || 'Must contain a lowercase letter.',
  hasDigits: (value) => (value && /\d/.test(value)) || 'Must contain a number.',
}

export default function SignUp() {
  const styles = useStyles()
  const {
    control,
    handleSubmit,
    resetField,
    clearErrors,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFields>({
    defaultValues: {
      role: Role.TRADESPERSON,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
  })
  const [isUsingPhoneNumber, setIsUsingPhoneNumber] = useState(false)
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const { setRole, setUser } = useAuthStore(
    useShallow((state) => ({
      setRole: state.setRole,
      setUser: state.setUser,
    }))
  )

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    passwordRef.current?.blur()

    const { userCredential, errorMessage } = await AccountService.signUp(data)

    if (userCredential) {
      setUser(userCredential.user)
      router.replace('/(main)/(tabs)/')
    } else {
      setError('root.signup', {
        message: errorMessage,
        type: 'signup',
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
    resetField('email')
    resetField('phone')
  }

  return (
    <>
      <ClPageView>
        <View style={styles.form}>
          <Controller
            name="role"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <ClRadioInput
                label="Select your role"
                options={options}
                value={field.value ?? ''}
              />
            )}
          />
          <ControlledTextInput
            name="firstName"
            control={control}
            rules={{
              required: true,
            }}
            textInputOptions={{
              label: 'First name',
              placeholder: 'Juan',
              returnKeyType: 'next',
              nextInput: lastNameRef,
            }}
          />
          <ControlledTextInput
            name="lastName"
            control={control}
            rules={{
              required: true,
            }}
            textInputOptions={{
              label: 'Last name',
              placeholder: 'dela Cruz',
              returnKeyType: 'next',
              ref: lastNameRef,
              nextInput: isUsingPhoneNumber ? phoneRef : emailRef,
            }}
          />
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
                  ref: phoneRef,
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
                  ref: emailRef,
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
          <ControlledTextInput
            name="password"
            control={control}
            rules={{
              required: true,
              validate: passwordValidators,
              minLength: {
                value: 8,
                message: 'Password must be 8 characters long.',
              },
            }}
            textInputOptions={{
              label: 'Password',
              passwordMode: true,
              placeholder: '********',
              returnKeyType: 'done',
              ref: passwordRef,
            }}
          />
          <ClText type="helper" dim style={{ textAlign: 'center' }}>
            By creating an account, you agree with our{' '}
            <ClLinkText href="/" style={{ fontSize: Typo.presets.sm.fontSize }}>
              Terms of Service
            </ClLinkText>{' '}
            &{' '}
            <ClLinkText href="/" style={{ fontSize: Typo.presets.sm.fontSize }}>
              Privacy Policy
            </ClLinkText>
          </ClText>
          <ClTextButton text="Continue" onPress={handleSubmit(onSubmit)} />
        </View>
      </ClPageView>
      {errors.root?.signup && (
        <ClAlert
          visible={true}
          title="Sign in failed"
          description={errors.root.signup.message}
          state={AlertState.ERROR}
          rightButton={{
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
  form: {
    gap: spacing[6],
  },
  switcher: {
    color: resolveColor(colors.accent[500], colors.brand[600]),
  },
}))
