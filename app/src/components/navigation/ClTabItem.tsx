import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { useThemeStore } from '@/stores/theme'
import { Sizes } from '@/theme'
import type { IconType } from '@/types/Icons'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { useLayoutEffect } from 'react'
import type { PressableProps } from 'react-native'
import Animated, {
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
} from 'react-native-reanimated'
import { ClAnimatedPressable } from '../ClAnimated'
import { ClIcon } from '../ClIcon'

export type ClTabIcon = {
  outline: IconType
  filled: IconType
}

interface ClTabItemProps extends PressableProps {
  icon: IconType
  label:
    | string
    | ((props: {
        focused: boolean
        color: string
        position: LabelPosition
        children: string
      }) => React.ReactNode)
  routeName: string
  isFocused: boolean
  options: BottomTabNavigationOptions
}

export function ClTabItem(props: ClTabItemProps) {
  useRenderCount('TabItem')

  const { label, icon, routeName, isFocused, options, onPress, onLongPress } =
    props
  const styles = useStyles()
  const colors = useThemeStore((state) => state.colors)
  const ACTIVE_SCALE = 1.5
  const iconScale = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: iconScale.value,
      },
    ],
  }))

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useLayoutEffect(() => {
    iconScale.value = withSpring(isFocused ? ACTIVE_SCALE : 1, {
      damping: 10,
      stiffness: 382,
    })
  }, [isFocused])

  return (
    <ClAnimatedPressable
      key={routeName}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <Animated.View style={animatedStyles}>
        <ClIcon
          set={icon.set}
          name={icon.name}
          color={isFocused ? colors.white : colors.secondaryText}
          size={Sizes.icon.md}
        />
      </Animated.View>
      {!isFocused && (
        <Animated.Text
          style={styles.label}
          entering={ZoomIn}
          exiting={SlideOutDown.duration(300)}
        >
          {label as string}
        </Animated.Text>
      )}
    </ClAnimatedPressable>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[3],
    gap: spacing[1],
  },
  label: {
    color: colors.secondaryText,
    fontSize: typo.presets.xs.fontSize,
    fontFamily: typo.family.regular,
  },
}))
