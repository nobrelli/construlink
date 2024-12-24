import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useScheme } from '@/hooks/useScheme'
import { useAppStore } from '@/stores/app'
import { Sizes, Styled } from '@/theme'
import type { SkinnedButtonColors } from '@/theme/styled'
import {
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ClSpringAnimatedPressable } from './ClAnimated'
import { ClText } from './ClText'

const ANIMATION_DURATION = 100

export interface ClTextButtonProps
  extends Omit<PressableProps, 'style' | 'children'> {
  text: string
  variant?: 'solid' | 'outline' | 'ghost'
  color?: SkinnedButtonColors
  size?: keyof typeof Styled.Button.sizes
  bodyStyle?: PressableProps['style']
  textStyle?: StyleProp<TextStyle>
  loading?: boolean
}

const ButtonBase = Animated.createAnimatedComponent(ClSpringAnimatedPressable)

export function ClTextButton(props: ClTextButtonProps) {
  const scheme = useScheme()
  const {
    text,
    variant = 'solid',
    color = scheme === 'dark' ? 'accent' : 'brand',
    size = 'base',
    disabled,
    bodyStyle,
    textStyle,
    loading,
    ...rest
  } = props
  const styles = useStyles({ color, size })
  const colors = useAppStore((state) => state.colors)

  const colorProgress = useSharedValue(0)
  const buttonAnimStyles = useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [Styled.Button.colors[scheme][color].background, colors[color][700]]
    )

    return {
      backgroundColor: variant === 'solid' ? interpolatedColor : undefined,
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
      {...rest}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.body,
        bodyBaseStyles,
        bodyStyle,
        buttonAnimStyles,
        disabled && styles.bodyVariantDisabled,
      ]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size={Sizes.icon.md} color={colors.white} />
      ) : (
        <ClText
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
        </ClText>
      )}
    </ButtonBase>
  )
}

const useStyles = createStyles(
  (
    { scheme, styled: { Button }, colors },
    { color, size }: Required<Pick<ClTextButtonProps, 'color' | 'size'>>
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
        borderColor: Button.colors[scheme][color].border,
      },
      bodyVariantSolid: {
        backgroundColor: Button.colors[scheme][color].background,
      },
      bodyVariantOutline: {
        backgroundColor: 'transparent',
      },
      bodyVariantDisabled: {
        backgroundColor: Button.colors[scheme].disabled.background,
        borderColor: Button.colors[scheme].disabled.border,
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
          Button.colors[scheme][color].background
        ),
      },
      textVariantDisabled: {
        color: resolveColor(colors.neutral[800], colors.neutral[500]),
      },
    }
  }
)
