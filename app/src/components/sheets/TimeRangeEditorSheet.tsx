import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { ClBottomSheet } from '../ClBottomSheet'
import { ClTextButton } from '../ClTextButton'
import type { Day } from '../ScheduleDayItem'
import { TimeRangeEditor } from '../TimeRangeEditor'

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
    <ClBottomSheet
      ref={sheetRef}
      title="Set your time"
      enableDynamicSizing
      footerComponent={<ClTextButton text="Save" />}
    >
      <TimeRangeEditor timeRange={timeRange} />
    </ClBottomSheet>
  )
})
