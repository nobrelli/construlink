import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { type ReactNode, forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import { SkinnedText } from './SkinnedText'

export interface SkinnedBottomSheetProps extends BottomSheetModalProps {
  title: string
  children: ReactNode | ReactNode[]
}

export const SkinnedBottomSheet = forwardRef<
  BottomSheetModal,
  SkinnedBottomSheetProps
>((props, ref) => {
  const { title, children } = props
  const styles = useStyles()

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

  return (
    <BottomSheetModal
      ref={ref}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      backdropComponent={renderBackdrop}
      enableDismissOnClose
    >
      <BottomSheetView style={styles.container}>
        <SkinnedText style={styles.title}>{title}</SkinnedText>
        <View style={styles.contents}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  background: {
    backgroundColor: resolveColor(colors.neutral[700], colors.neutral[200]),
  },
  container: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    gap: spacing[4],
  },
  contents: {
    gap: spacing[4],
  },
  bottomSheetIndicator: {
    backgroundColor: colors.primaryText,
  },
  title: {
    textAlign: 'center',
    fontFamily: typo.family.semiBold,
    marginBottom: spacing[2],
  },
}))
