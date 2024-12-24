import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import spacing from '@/theme/spacing'
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  type BottomSheetFooterProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { useMount } from '@reactuses/core'
import { type ReactNode, forwardRef, useCallback } from 'react'
import { BackHandler, type StyleProp, type ViewStyle } from 'react-native'

export interface ClBottomSheetProps
  extends Omit<BottomSheetModalProps, 'footerComponent'> {
  title?: string
  children: ReactNode | ReactNode[]
  footerComponent?: ReactNode | ReactNode[]
  scrollable?: boolean
  contentContainerStyle?: StyleProp<ViewStyle>
}

export const ClBottomSheet = forwardRef<BottomSheetModal, ClBottomSheetProps>(
  (props, ref) => {
    const {
      title,
      children,
      footerComponent,
      scrollable,
      contentContainerStyle,
      ...rest
    } = props
    const styles = useStyles()
    const { dismiss } = useBottomSheetModal()

    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    )

    // biome-ignore lint/correctness/useExhaustiveDependencies:
    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => (
        <BottomSheetFooter
          {...props}
          bottomInset={spacing[6]}
          style={styles.footer}
        >
          {footerComponent}
        </BottomSheetFooter>
      ),
      []
    )

    useMount(() => {
      const handleBackButton = () => {
        return dismiss()
      }

      BackHandler.addEventListener('hardwareBackPress', handleBackButton)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    })

    const View = scrollable ? BottomSheetScrollView : BottomSheetView

    return (
      <BottomSheetModal
        {...rest}
        ref={ref}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        footerComponent={footerComponent ? renderFooter : undefined}
      >
        <View contentContainerStyle={styles.container}>
          {children}
          {/* <ClText style={styles.title}>{title}</ClText>
          <View
            style={[
              styles.contents,
              footerComponent !== undefined && {
                paddingBottom: Spacing[20],
              },
              contentContainerStyle,
            ]}
          >
            {children}
          </View> */}
        </View>
      </BottomSheetModal>
    )
  }
)

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  background: {
    backgroundColor: resolveColor(colors.neutral[800], colors.white),
  },
  container: {
    padding: spacing[4],
    gap: spacing[4],
  },
  contents: {
    gap: spacing[4],
    paddingHorizontal: spacing[4],
  },
  bottomSheetIndicator: {
    backgroundColor: colors.primaryText,
  },
  title: {
    textAlign: 'center',
    fontFamily: typo.family.semiBold,
    marginBottom: spacing[2],
  },
  footer: {
    paddingHorizontal: spacing[4],
  },
}))
