import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { IconSet, type IconType } from '@/types/Icons'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { type ColorValue, View } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { ClIcon } from './ClIcon'
import { ClText } from './ClText'
import { ClTextButton } from './ClTextButton'

export enum AlertState {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

interface AlertButtonProps {
  text: string
  onPress?: () => void
}

interface ClAlertProps {
  visible?: boolean
  title?: string
  description?: string
  state?: AlertState
  timeout?: number
  leftButton?: AlertButtonProps
  rightButton?: AlertButtonProps
}

export interface ClAlertHandleProps {
  show: () => void
}

const icons: Record<AlertState, IconType> = {
  success: {
    set: IconSet.MaterialCommunityIcons,
    name: 'check-circle-outline',
  },
  warning: {
    set: IconSet.MaterialIcon,
    name: 'error-outline',
  },
  error: {
    set: IconSet.MaterialIcon,
    name: 'dangerous',
  },
}

export const ClAlert = forwardRef<ClAlertHandleProps, ClAlertProps>(
  (props, ref) => {
    const {
      visible,
      title,
      description,
      state = AlertState.ERROR,
      timeout = 4000,
      leftButton,
      rightButton,
    } = props
    const styles = useStyles({ state })
    const [isVisible, setIsVisible] = useState(visible)

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
        style={styles.backdrop}
        entering={FadeInUp}
        exiting={FadeOutUp}
      >
        <View style={styles.iconWrapper}>
          <ClIcon
            {...icons[state]}
            color={styles.icon.color}
            size={styles.icon.fontSize}
          />
        </View>
        <View style={styles.body}>
          <ClText weight="bold" style={styles.title}>
            {title}
          </ClText>
          {description && (
            <ClText style={styles.description} dim>
              {description}
            </ClText>
          )}
          {(leftButton || rightButton) && (
            <View style={styles.buttons}>
              {leftButton && (
                <ClTextButton
                  text={leftButton.text}
                  bodyStyle={styles.button}
                  size="small"
                  onPress={leftButton.onPress}
                />
              )}
              {rightButton && (
                <ClTextButton
                  text={rightButton.text}
                  bodyStyle={styles.button}
                  size="small"
                  onPress={rightButton.onPress}
                />
              )}
            </View>
          )}
        </View>
      </Animated.View>
    ) : null
  }
)

const useStyles = createStyles(
  (
    { mode, sizes, colors, spacing, typo },
    { state }: { state: AlertState }
  ) => {
    const iconColors: Record<AlertState, ColorValue> = {
      success: resolveColor(
        colors.states.success[500],
        colors.states.success[700]
      ),
      warning: resolveColor(
        colors.states.warning[400],
        colors.states.warning[400]
      ),
      error: resolveColor(colors.states.danger[400], colors.states.danger[300]),
    }

    return {
      backdrop: {
        backgroundColor: colors.modalBackground,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconWrapper: {
        borderTopLeftRadius: sizes.radius.full,
        borderTopRightRadius: sizes.radius.full,
        backgroundColor: resolveColor(colors.neutral[700], colors.white),
        padding: spacing[1],
        top: spacing[8],
        zIndex: 1,
      },
      icon: {
        color: iconColors[state],
        fontSize: sizes.icon['2xl'],
      },
      body: {
        backgroundColor: resolveColor(colors.neutral[700], colors.background),
        padding: spacing[4],
        borderRadius: sizes.radius['2xl'] + spacing[2],
        marginHorizontal: spacing[2],
        paddingTop: spacing[8],
      },
      title: {
        textAlign: 'center',
        marginBottom: spacing[4],
        fontSize: typo.presets.lg.fontSize,
      },
      description: {
        textAlign: 'center',
      },
      buttons: {
        flexDirection: 'row',
        gap: spacing[4],
        marginTop: spacing[4],
      },
      button: {
        flex: 1,
      },
    }
  }
)
