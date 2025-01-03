import { resolveColor } from '@/helpers/resolveColor'
import { useAppStore } from '@/stores/app'
import { Sizes, Spacing } from '@/theme'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import type { ComponentProps } from 'react'
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form'
import { View } from 'react-native'
import { ClTextInput } from '../ClTextInput'
import ErrorMessage from './ErrorMessage'

type TextInputProps = ComponentProps<typeof ClTextInput>

interface ControlledTextInputProps {
  textInputOptions?: Partial<
    Omit<TextInputProps, 'onBlur' | 'onChange' | 'value' | 'valid' | 'disabled'>
  >
}

export const ControlledTextInput = <TFields extends FieldValues>({
  textInputOptions,
  ...controllerProps
}: ControlledTextInputProps & UseControllerProps<TFields>) => {
  const { field, fieldState } = useController(controllerProps)
  const colors = useAppStore((state) => state.colors)

  return (
    <View style={{ gap: Spacing[1] }}>
      <ClTextInput
        onChangeText={field.onChange}
        {...field}
        valid={!fieldState.invalid}
        {...textInputOptions}
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
