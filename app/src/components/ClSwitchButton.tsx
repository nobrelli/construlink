import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useScheme } from '@/hooks/useScheme'
import { Palette } from '@/theme'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface ClSwitchButtonProps {
  active: boolean
  onChange?: (enabled: boolean) => void
}

export function ClSwitchButton({ active, onChange }: ClSwitchButtonProps) {
  const styles = useStyles()
  const scheme = useScheme()
  const [isActive, setIsActive] = useState(active)
  const progress = useDerivedValue(() => withTiming(isActive ? 22 : 0))

  const animatedContainerStyles = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 22],
        [
          scheme === 'dark'
            ? Palette.dark.neutral[700]
            : Palette.light.neutral[200],
          scheme === 'dark'
            ? Palette.dark.accent[500]
            : Palette.light.brand.base,
        ]
      ),
    }),
    [scheme]
  )

  const knobTranslate = useSharedValue(0)

  const animatedKnobStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(knobTranslate.value, {
          mass: 0.5,
          damping: 12,
          stiffness: 200,
          overshootClamping: false,
        }),
      },
    ],
  }))

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    knobTranslate.value = isActive ? 20 : 4

    if (onChange) {
      onChange(isActive)
    }
  }, [isActive, knobTranslate])

  return (
    <Pressable onPress={() => setIsActive(!isActive)}>
      <Animated.View style={[styles.container, animatedContainerStyles]}>
        <Animated.View style={[styles.knob, animatedKnobStyles]} />
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles(({ colors, spacing }) => ({
  container: {
    width: spacing[12],
    height: spacing[8],
    backgroundColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    borderRadius: 30,
    justifyContent: 'center',
  },
  knob: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: resolveColor('white', 'black'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
}))
