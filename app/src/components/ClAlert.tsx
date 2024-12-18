import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { IconSet, type IconType } from '@/types/Icons'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { type ColorValue, Modal, View } from 'react-native'
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
  secondaryButton?: AlertButtonProps
  primaryButton?: AlertButtonProps
}

export interface ClAlertHandleProps {
  show: (options?: Omit<ClAlertProps, 'visible'>) => void
  hide: () => void
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
    const [options, setOptions] = useState<ClAlertProps>({
      ...props,
      visible: props.visible ?? false,
      state: props.state ?? AlertState.SUCCESS,
    })
    // biome-ignore lint/style/noNonNullAssertion:
    const styles = useStyles({ state: options.state! })

    useImperativeHandle(ref, () => ({
      show(options) {
        setOptions((state) => ({ ...state, ...options, visible: true }))
      },
      hide() {
        setOptions((state) => ({ ...state, visible: false }))
      },
    }))

    return (
      <Modal
        visible={options.visible}
        transparent={true}
        animationType="fade"
        hardwareAccelerated={true}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.iconWrapper}>
            <ClIcon
              // biome-ignore lint/style/noNonNullAssertion:
              {...icons[options.state!]}
              color={styles.icon.color}
              size={styles.icon.fontSize}
            />
          </View>
          <View style={styles.body}>
            <ClText weight="bold" style={styles.title}>
              {options?.title}
            </ClText>
            {options.description && (
              <ClText style={styles.description} dim>
                {options?.description}
              </ClText>
            )}
            {(options.secondaryButton || options.primaryButton) && (
              <View style={styles.buttons}>
                {options.secondaryButton && (
                  <ClTextButton
                    text={options.secondaryButton.text}
                    bodyStyle={styles.button}
                    size="small"
                    variant="outline"
                    onPress={options.secondaryButton.onPress}
                  />
                )}
                {options.primaryButton && (
                  <ClTextButton
                    text={options.primaryButton.text}
                    bodyStyle={styles.button}
                    size="small"
                    onPress={options.primaryButton.onPress}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    )
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
      // backdrop: {
      //   backgroundColor: colors.modalBackground,
      // },
      modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.modalBackground,
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
        width: '90%',
        backgroundColor: resolveColor(colors.neutral[700], colors.background),
        padding: spacing[4],
        borderRadius: sizes.radius['2xl'] + spacing[2],
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
