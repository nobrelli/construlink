import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { IconSet, type IconType } from '@/types/Icons'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { ClIcon } from './ClIcon'
import { ClText } from './ClText'

interface ClToastProps {
  type: 'success' | 'info' | 'warning' | 'danger'
  title: string
  description?: string
  timeout?: number
}

export interface ClToastHandleProps {
  show: () => void
}

const icons: Record<ClToastProps['type'], IconType> = {
  success: {
    set: IconSet.MaterialCommunityIcons,
    name: 'check-circle-outline',
  },
  info: {
    set: IconSet.MaterialCommunityIcons,
    name: 'information-outline',
  },
  warning: {
    set: IconSet.Ionicons,
    name: 'warning-outline',
  },
  danger: {
    set: IconSet.AntDesign,
    name: 'exclamationcircleo',
  },
}

export const ClToast = forwardRef<ClToastHandleProps, ClToastProps>(
  (props, ref) => {
    const { type, title, description, timeout = 4000 } = props
    const styles = useStyles({ type })
    const [isVisible, setIsVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      show() {
        setIsVisible(true)

        const timer = setTimeout(() => {
          setIsVisible(false)
          clearTimeout(timer)
        }, timeout)
      },
    }))

    return isVisible ? (
      <Animated.View
        style={styles.container}
        entering={SlideInUp}
        exiting={SlideOutUp}
      >
        <ClIcon
          set={icons[type].set}
          name={icons[type].name}
          color={styles.icon.color}
          size={styles.icon.fontSize}
        />
        <View style={styles.contents}>
          <ClText weight="bold" style={styles.title}>
            {title}
          </ClText>
          {description && (
            <ClText style={styles.description}>{description}</ClText>
          )}
        </View>
      </Animated.View>
    ) : null
  }
)

const useStyles = createStyles(
  (
    { scheme, styled: { Toast }, sizes, colors, spacing },
    { type }: { type: ClToastProps['type'] }
  ) => ({
    container: {
      position: 'absolute',
      top: spacing.px,
      width: '92%',
      backgroundColor: Toast.colors[scheme][type].backgroundColor,
      borderRadius: Toast.radius,
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing[4],
      alignSelf: 'center',
      shadowColor: resolveColor(colors.white, colors.black),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    icon: {
      color: colors.white,
      fontSize: sizes.icon.lg,
    },
    contents: {
      marginLeft: spacing[4],
      flexShrink: 1,
    },
    title: {
      color: colors.white,
    },
    description: {
      color: colors.white,
    },
  })
)
