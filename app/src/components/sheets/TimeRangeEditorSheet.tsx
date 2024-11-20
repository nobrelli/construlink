import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { Day } from '../ScheduleDayItem'
import { TimeRangeEditor } from '../TimeRangeEditor'
import { SkinnedBottomSheet } from '../skinned/SkinnedBottomSheet'
import { SkinnedTextButton } from '../skinned/SkinnedTextButton'

type Handle = Partial<BottomSheetModal>

export const TimeRangeEditorSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const [timeRange, setTimeRange] = useState<Day['timeRange']>()
  const sheetRef = useRef<BottomSheetModal>(null)

  useImperativeHandle<Handle, Handle>(
    ref,
    () => ({
      present(data: Day['timeRange']) {
        sheetRef.current?.present()
        setTimeRange(data)
      },
    }),
    []
  )

  return (
    <SkinnedBottomSheet
      ref={sheetRef}
      title="Set your time"
      enableDynamicSizing
    >
      <TimeRangeEditor timeRange={timeRange} />
      <SkinnedTextButton text="Save" />
    </SkinnedBottomSheet>
  )
})
