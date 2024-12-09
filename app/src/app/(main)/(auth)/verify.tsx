import {
  ClCodeInput,
  type ClCodeInputHandleProps,
} from '@/components/ClCodeInput'
import { ClPageView } from '@/components/ClPageView'
import { ClText } from '@/components/ClText'
import FormMessage from '@/components/controlled/FormMessage'
import { useAuthStore } from '@/stores/auth'
import { Spacing } from '@/theme'
import type { CodeField } from '@/types/Fields'
import { useMount } from '@reactuses/core'
import { router } from 'expo-router'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

export default function Verify() {
  const credentialToVerify = useAuthStore((state) => state.credentialToVerify)
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<CodeField>({
    defaultValues: { code: '' },
  })
  const codeInputRef = useRef<ClCodeInputHandleProps>(null)

  useMount(() => {
    codeInputRef.current?.focus()
  })

  return (
    <ClPageView
      subtitle={
        <ClText type="lead" dim>
          Enter the 4-digit code we sent to{' '}
          <ClText type="lead" weight="bold">
            {credentialToVerify}
          </ClText>{' '}
          to continue.
        </ClText>
      }
    >
      <View style={{ gap: Spacing[6] }}>
        {errors.root && (
          <FormMessage
            message={errors.root.code.message as string}
            state="danger"
          />
        )}
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <ClCodeInput
              ref={codeInputRef}
              length={4}
              code={field.value}
              onChange={(value) => setValue('code', value)}
              onDone={() => router.navigate('/(main)/(auth)/(signup)/done')}
            />
          )}
        />
        {/* <ClTextButton
            size='small'
            disabled={secondsRemaining > 0}
            onPress={() => router.back()}
            text={`Try again ${secondsRemaining > 0 && ` after ${secondsRemaining}s`}`}
          /> */}
      </View>
    </ClPageView>
  )
}
