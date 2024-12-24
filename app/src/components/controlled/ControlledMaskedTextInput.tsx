import { resolveColor } from '@/helpers/resolveColor'
import { useRenderCount } from '@/hooks/useRenderCount'
import { useAppStore } from '@/stores/app'
import { Sizes, Spacing } from '@/theme'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { type ComponentProps, useCallback, useState } from 'react'
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form'
import { View } from 'react-native'
import { SkinnedMaskedTextInput } from '../skinned/SkinnedMaskedTextInput'
import ErrorMessage from './ErrorMessage'

type TextInputProps = ComponentProps<typeof SkinnedMaskedTextInput>

interface ControlledMaskedTextInputProps {
  textInputOptions?: Partial<
    Omit<
      TextInputProps,
      'onBlur' | 'onChange' | 'onChangeText' | 'value' | 'valid' | 'disabled'
    >
  >
  mask: string
}

export const ControlledMaskedTextInput = <TFields extends FieldValues>({
  mask,
  textInputOptions,
  ...controllerProps
}: ControlledMaskedTextInputProps & UseControllerProps<TFields>) => {
  useRenderCount('ControlledMaskedTextInput')
  const colors = useAppStore((state) => state.colors)
  const { field, fieldState } = useController(controllerProps)
  const [value, setValue] = useState('')

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  const onChangeText = useCallback((formatted: string, extracted: string) => {
    setValue(formatted)
    field.onChange(extracted)
  }, [])

  return (
    <View style={{ gap: Spacing[1] }}>
      <SkinnedMaskedTextInput
        {...field}
        {...textInputOptions}
        mask={mask}
        valid={!fieldState.invalid}
        onChangeText={onChangeText}
        onChange={() => null}
        value={value}
      />
      {fieldState.invalid && fieldState.error?.message && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing[1],
          }}
        >
          <Icon
            name="error"
            size={Sizes.icon.sm}
            color={resolveColor(
              colors.states.danger[300],
              colors.states.danger[400]
            )}
          />
          <ErrorMessage message={fieldState.error?.message} />
        </View>
      )}
    </View>
  )
}
