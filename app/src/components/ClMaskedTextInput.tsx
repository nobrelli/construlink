import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useThemeStore } from '@/stores/theme'
import { Sizes, type Styled } from '@/theme'
import type { MaterialIcons as Icon } from '@expo/vector-icons'
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  type RefObject,
  cloneElement,
  forwardRef,
  memo,
  useState,
} from 'react'
import {
  type NativeSyntheticEvent,
  type TextInput as RNTextInput,
  type StyleProp,
  type TextInputFocusEventData,
  type TextStyle,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'
import {
  MaskedTextInput,
  type MaskedTextInputProps,
} from 'react-native-advanced-input-mask'
import { ClText } from './ClText'

export interface ClMaskedTextInputProps {
  label: string
  disabled: boolean
  valid: boolean
  left: ReactElement | undefined
  right: ReactElement | undefined
  inputWrapperStyle: StyleProp<ViewStyle>
  inputFieldStyle: StyleProp<TextStyle>
  size: keyof typeof Styled.TextInput.sizes
  independent: boolean // turns autocomplete & autocorrect on/off
  nextInput: RefObject<RNTextInput>
}

// Forward ref to access the TextInput node
export const ClMaskedTextInput = memo(
  forwardRef<
    typeof MaskedTextInput,
    Partial<ClMaskedTextInputProps> & MaskedTextInputProps
  >((props, ref) => {
    const {
      label,
      disabled,
      valid = true,
      left,
      right,
      inputWrapperStyle,
      inputFieldStyle,
      size = 'medium',
      independent,
      nextInput,
      onFocus,
      ...rest
    } = props

    const [focused, setFocused] = useState(false)

    const colors = useThemeStore((state) => state.colors)
    const styles = useStyles({ size })
    const touchOpacity = 0.7
    const iconSize = {
      small: Sizes.icon.md,
      medium: Sizes.icon.md,
      large: Sizes.icon.lg,
    }[size]

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true)
      onFocus?.(e)
    }

    const inputElement = (
      <MaskedTextInput
        {...rest}
        editable={!disabled}
        style={[styles.inputField, inputFieldStyle]}
        underlineColorAndroid="transparent"
        placeholderTextColor={
          disabled
            ? resolveColor(colors.neutral[600], colors.neutral[100])
            : resolveColor(colors.neutral[500], colors.neutral[400])
        }
        selectionColor={colors.neutral[300]}
        onFocus={handleFocus}
        onBlur={() => setFocused(false)}
        autoComplete={independent ? 'off' : undefined}
        autoCorrect={!independent}
        returnKeyType={nextInput ? 'next' : 'done'}
        onSubmitEditing={() =>
          nextInput ? nextInput.current?.focus() : undefined
        }
        blurOnSubmit={false}
      />
    )

    const InputBody = (rest.onPress ? TouchableOpacity : View) as ElementType<
      TouchableOpacityProps | ViewProps
    >

    return (
      <View>
        {label && <ClText style={styles.inputLabel}>{label}</ClText>}
        <InputBody
          style={[
            styles.input,
            focused && styles.inputFocus,
            !valid && styles.inputInvalid,
            disabled && styles.inputDisabled,
            inputWrapperStyle,
          ]}
          onPress={rest.onPress}
        >
          {left &&
            cloneElement(left, {
              style: [
                styles.left,
                left?.props?.style,
                disabled && styles.iconDisabled,
              ],
              pointerEvents: 'none',
              size: iconSize,
            } as Omit<ComponentPropsWithoutRef<typeof Icon>, 'name'>)}
          {inputElement}
          {right &&
            cloneElement(right, {
              style: [
                styles.right,
                right?.props?.style,
                disabled && styles.iconDisabled,
              ],
              pointerEvents: 'none',
              size: iconSize,
            } as Omit<ComponentPropsWithoutRef<typeof Icon>, 'name'>)}
        </InputBody>
      </View>
    )
  })
)

const useStyles = createStyles(
  (
    { mode, styled: { TextInput }, spacing, sizes, colors, typo },
    { size }: Pick<ClMaskedTextInputProps, 'size'>
  ) => {
    return {
      inputLabel: {
        marginBottom: spacing[2],
        fontSize: TextInput.sizes[size].labelFontSize,
        lineHeight: TextInput.sizes[size].labelFontSize,
      },

      // Body
      input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderRadius: TextInput.radius,
        backgroundColor: TextInput.colors[mode].background,
        borderWidth: sizes.borderWidth.thin,
        borderColor: TextInput.colors[mode].border,
        padding: TextInput.sizes[size].padding,
      },
      inputFocus: {
        borderColor: resolveColor(colors.accent.base, colors.brand[400]),
        backgroundColor: resolveColor(colors.accent[900], colors.brand[50]),
      },
      inputInvalid: {
        borderColor: resolveColor(
          colors.states.danger[300],
          colors.states.danger[400]
        ),
        backgroundColor: resolveColor(
          colors.states.danger[900],
          colors.states.danger[50]
        ),
      },
      inputDisabled: {
        borderColor: resolveColor(colors.neutral[800], colors.neutral[50]),
      },

      // The actual field
      inputField: {
        flex: 1,
        minWidth: 0,
        width: '100%',
        height: '100%',
        color: colors.primaryText,
        fontFamily: typo.family.medium,
        fontSize: TextInput.sizes[size].fontSize,
      },

      inputIcon: {
        color: colors.secondaryText,
      },
      left: {
        color: colors.secondaryText,
        paddingRight: TextInput.sizes[size].padding,
      },
      right: {
        color: colors.secondaryText,
        paddingLeft: TextInput.sizes[size].padding,
      },
      iconDisabled: {
        color: resolveColor(colors.neutral[600], colors.neutral[200]),
      },
    }
  }
)
