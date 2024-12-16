import { resolveColor } from '@/helpers/resolveColor'
import { useThemeStore } from '@/stores/theme'
import { Sizes, Spacing } from '@/theme'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import type { ComponentProps } from 'react'
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form'
import { View } from 'react-native'
import { ClSelectInput, type SelectInputOption } from '../ClSelectInput'
import ErrorMessage from './ErrorMessage'

type SelectInputProps = ComponentProps<typeof ClSelectInput>

interface ControlledSelectInputProps {
  options: SelectInputOption[]
  selectInputOptions?: Partial<
    Omit<
      SelectInputProps,
      'onBlur' | 'onChange' | 'value' | 'valid' | 'disabled' | 'options'
    >
  >
}

export const ControlledSelectInput = <TFields extends FieldValues>({
  options,
  selectInputOptions,
  ...controllerProps
}: ControlledSelectInputProps & UseControllerProps<TFields>) => {
  const { field, fieldState } = useController(controllerProps)
  const colors = useThemeStore((state) => state.colors)

  return (
    <View style={{ gap: Spacing[1] }}>
      <ClSelectInput
        options={options}
        {...field}
        onChangeText={field.onChange}
        valid={!fieldState.invalid}
        {...selectInputOptions}
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
