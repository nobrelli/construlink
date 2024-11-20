import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { type ReactNode, forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import { SkinnedText } from './SkinnedText'

interface CustomBottomSheetProps {
  title: string
  snapPoints?: (string | number)[]
  children: ReactNode | ReactNode[]
  onOpen?: () => void
}

export const SkinnedBottomSheet = forwardRef<
  BottomSheetModal,
  CustomBottomSheetProps
>((props, ref) => {
  const { title, snapPoints, onOpen, children } = props
  const styles = useStyles()

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    []
  )

  const handleOpen = (index: number) => {
    if (index > -1 && onOpen) {
      onOpen()
    }
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheet}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      onChange={handleOpen}
    >
      <BottomSheetView style={styles.container}>
        <SkinnedText style={styles.title}>{title}</SkinnedText>
        <View style={styles.contents}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

const useStyles = createStyles(({ colors, spacing, typo }) => ({
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    gap: spacing[4],
  },
  contents: {
    gap: spacing[4],
  },
  bottomSheet: {
    backgroundColor: resolveColor(colors.neutral[700], colors.neutral[200]),
  },
  bottomSheetIndicator: {
    backgroundColor: colors.primaryText,
  },
  title: {
    textAlign: 'center',
    fontFamily: typo.family.semiBold,
  },
}))
