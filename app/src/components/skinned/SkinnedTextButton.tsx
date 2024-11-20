import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useScheme } from '@/hooks/useScheme'
import { useThemeStore } from '@/stores/theme'
import { Styled } from '@/theme'
import type { SkinnedButtonColors } from '@/theme/styled'
import type { PressableProps, StyleProp, TextStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SpringAnimatedPressable } from '../Animated'
import { SkinnedText } from './SkinnedText'

const ANIMATION_DURATION = 100

export interface SkinnedTextButtonProps
  extends Omit<PressableProps, 'style' | 'children'> {
  text: string
  variant?: 'solid' | 'outline' | 'ghost'
  color?: SkinnedButtonColors
  size?: keyof typeof Styled.Button.sizes
  bodyStyle?: PressableProps['style']
  textStyle?: StyleProp<TextStyle>
}

const ButtonBase = Animated.createAnimatedComponent(SpringAnimatedPressable)

export function SkinnedTextButton(props: SkinnedTextButtonProps) {
  const scheme = useScheme()
  const {
    text,
    variant = 'solid',
    color = scheme === 'dark' ? 'accent' : 'brand',
    size = 'base',
    disabled,
    bodyStyle,
    textStyle,
    ...rest
  } = props
  const styles = useStyles({ color, size })
  const colors = useThemeStore((state) => state.colors)

  const colorProgress = useSharedValue(0)
  const buttonAnimStyles = useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [Styled.Button.colors[scheme][color].background, colors[color][700]]
    )

    return {
      backgroundColor: interpolatedColor,
      borderColor: interpolatedColor,
    }
  })

  const onPressIn = () => {
    colorProgress.value = withTiming(1, { duration: ANIMATION_DURATION })
  }

  const onPressOut = () => {
    colorProgress.value = withTiming(0, { duration: ANIMATION_DURATION })
  }

  const bodyBaseStyles = {
    solid: styles.bodyVariantSolid,
    outline: styles.bodyVariantOutline,
    ghost: { borderWidth: 0 },
  }[variant]

  const textBaseStyles = {
    solid: styles.textVariantSolid,
    outline: styles.textVariantOutline,
    ghost: { borderWidth: 0 },
  }[variant]

  return (
    <ButtonBase
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.body,
        bodyBaseStyles,
        bodyStyle,
        disabled && styles.bodyVariantDisabled,
        buttonAnimStyles,
      ]}
      {...rest}
    >
      <SkinnedText
        weight="semiBold"
        style={[
          styles.text,
          textBaseStyles,
          textStyle,
          disabled && styles.textVariantDisabled,
        ]}
        numberOfLines={1}
      >
        {text}
      </SkinnedText>
    </ButtonBase>
  )
}

const useStyles = createStyles(
  (
    { mode, styled: { Button }, colors },
    { color, size }: Required<Pick<SkinnedTextButtonProps, 'color' | 'size'>>
  ) => {
    return {
      body: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: Button.borderWidth,
        borderStyle: 'solid',
        overflow: 'hidden',
        borderRadius: Button.radius,
        paddingHorizontal: Button.sizes[size].px,
        paddingVertical: Button.sizes[size].py,
        borderColor: Button.colors[mode][color].border,
      },
      bodyVariantSolid: {
        backgroundColor: Button.colors[mode][color].background,
      },
      bodyVariantOutline: {
        backgroundColor: 'transparent',
      },
      bodyVariantDisabled: {
        backgroundColor: Button.colors[mode].disabled.background,
        borderColor: Button.colors[mode].disabled.border,
      },

      text: {
        textAlign: 'center',
        fontSize: Button.sizes[size].font.fontSize,
        lineHeight: Button.sizes[size].font.lineHeight,
      },
      textVariantSolid: {
        color: colors.white,
      },
      textVariantOutline: {
        color: resolveColor(
          colors.white,
          Button.colors[mode][color].background
        ),
      },
      textVariantDisabled: {
        color: resolveColor(colors.neutral[800], colors.neutral[500]),
      },
    }
  }
)
