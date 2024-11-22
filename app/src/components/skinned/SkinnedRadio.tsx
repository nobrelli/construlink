import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import type { Styled } from '@/theme'
import { useUpdateEffect } from '@reactuses/core'
import { useState } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { SpringAnimatedPressable } from '../Animated'
import { SkinnedText } from './SkinnedText'

export interface RadioOption {
  label: string
  value: string | number
}

interface SkinnedRadioInputProps {
  value?: RadioOption['value']
  options: RadioOption[]
  onChange?: (value: RadioOption['value']) => void
  contentContainerStyle?: StyleProp<ViewStyle>
  size?: keyof typeof Styled.TextInput.sizes
}

export function SkinnedRadioInput({
  value,
  options,
  onChange,
  size = 'medium',
  contentContainerStyle,
}: SkinnedRadioInputProps) {
  const styles = useStyles({ size })
  const [selected, setSelected] = useState(
    options.find((option) => option.value === value)?.value
  )
  const isSelected = (value: RadioOption['value']) => selected === value

  useUpdateEffect(() => {
    if (onChange && selected !== undefined) {
      onChange(selected)
    }
  }, [selected])

  return (
    <View style={[styles.container, contentContainerStyle]}>
      {options.map((option) => (
        <SpringAnimatedPressable
          key={option.value}
          style={[
            styles.option,
            isSelected(option.value) && styles.optionSelected,
          ]}
          onPress={() => setSelected(option.value)}
        >
          <View style={styles.optionLeft}>
            <View style={styles.radioButtonWrapper}>
              <View
                style={[
                  styles.radioButtonIndicator,
                  isSelected(option.value) &&
                    styles.radioButtonIndicatorSelected,
                ]}
              />
            </View>
          </View>
          <View style={styles.optionRight}>
            <SkinnedText style={styles.optionLabel}>{option.label}</SkinnedText>
          </View>
        </SpringAnimatedPressable>
      ))}
    </View>
  )
}

const useStyles = createStyles(
  (
    { colors, spacing, sizes, typo, styled: { TextInput } },
    { size = 'medium' }: Pick<SkinnedRadioInputProps, 'size'>
  ) => ({
    container: {
      gap: spacing[4],
    },
    option: {
      gap: spacing[4],
      flexDirection: 'row',
      backgroundColor: 'transparent',
      padding: TextInput.sizes[size].padding,
      borderRadius: sizes.radius['2xl'],
      borderWidth: sizes.borderWidth.thin,
      borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    },
    optionSelected: {
      backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    },
    optionLeft: {
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      flexGrow: 0,
    },
    optionRight: {
      flexShrink: 1,
    },
    optionLabel: {
      fontSize: TextInput.sizes[size].fontSize,
    },
    radioButtonWrapper: {
      justifyContent: 'center',
      width: sizes.icon.md,
      height: sizes.icon.md,
      borderRadius: sizes.radius.full,
      backgroundColor: resolveColor(colors.neutral[700], colors.neutral[50]),
      borderWidth: sizes.borderWidth.thin,
      borderColor: resolveColor(colors.neutral[600], colors.neutral[300]),
    },
    radioButtonIndicator: {
      width: sizes.icon.sm,
      height: sizes.icon.sm,
      alignSelf: 'center',
    },
    radioButtonIndicatorSelected: {
      backgroundColor: resolveColor(colors.accent[500], colors.brand.base),
      borderRadius: sizes.radius.full,
    },
  })
)
