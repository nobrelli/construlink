import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useScheme } from '@/hooks/useScheme'
import { useThemeStore } from '@/stores/theme'
import { Sizes, Styled } from '@/theme'
import type { SkinnedButtonColors } from '@/theme/styled'
import type { IconType } from '@/types/Icons'
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
import { ClIcon } from './ClIcon'

const ANIMATION_DURATION = 100

export interface ClIconButtonProps
  extends Omit<PressableProps, 'style' | 'children'> {
  icon: IconType
  variant?: 'solid' | 'outline' | 'ghost'
  color?: SkinnedButtonColors
  size?: keyof typeof Styled.Button.sizes
  bodyStyle?: PressableProps['style']
  textStyle?: StyleProp<TextStyle>
  loading?: boolean
}

const ButtonBase = Animated.createAnimatedComponent(ClSpringAnimatedPressable)

export function ClIconButton(props: ClIconButtonProps) {
  const scheme = useScheme()
  const {
    icon,
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
  const colors = useThemeStore((state) => state.colors)

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
        <ClIcon
          {...icon}
          style={[
            styles.text,
            textBaseStyles,
            textStyle,
            disabled && styles.textVariantDisabled,
          ]}
        />
      )}
    </ButtonBase>
  )
}

const useStyles = createStyles(
  (
    { mode, styled: { Button }, colors, typo, spacing },
    { color, size }: Required<Pick<ClIconButtonProps, 'color' | 'size'>>
  ) => {
    return {
      body: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: Button.borderWidth,
        borderStyle: 'solid',
        overflow: 'hidden',
        borderRadius: Button.radius,
        padding: spacing[2],
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
        fontSize: typo.presets['3xl'].fontSize,
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
