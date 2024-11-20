import { PageView } from '@/components/PageView'
import { type Day, ScheduleDayItem } from '@/components/ScheduleDayItem'
import {
  TimeRangeEditor,
  type TimeRangeEditorHandleProps,
} from '@/components/TimeRangeEditor'
import { SkinnedBottomSheet } from '@/components/skinned/SkinnedBottomSheet'
import { SkinnedTextButton } from '@/components/skinned/SkinnedTextButton'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { type ComponentRef, useCallback, useRef, useState } from 'react'
import { View } from 'react-native'

const days: Day[] = [
  {
    day: 'Mon',
    enabled: true,
    timeRange: ['8:00 AM', '6:00 PM'],
  },
  {
    day: 'Tue',
    enabled: true,
    timeRange: ['7:00 AM', '5:00 PM'],
  },
  {
    day: 'Wed',
    enabled: true,
    timeRange: ['7:00 AM', '5:00 PM'],
  },
  {
    day: 'Thu',
    enabled: true,
    timeRange: ['7:00 AM', '5:00 PM'],
  },
  {
    day: 'Fri',
    enabled: true,
    timeRange: ['7:00 AM', '5:00 PM'],
  },
  {
    day: 'Sat',
    enabled: false,
    timeRange: ['9:00 AM', '12:00 PM'],
  },
  {
    day: 'Sun',
    enabled: false,
    timeRange: ['7:00 AM', '5:00 PM'],
  },
]

export default () => {
  useRenderCount('Schedule Screen')

  const styles = useStyles()

  const timeRangeRef = useRef<Day['timeRange']>(['', ''])
  const timeRangeEditorRef = useRef<TimeRangeEditorHandleProps>(null)
  const bottomSheetRef = useRef<ComponentRef<typeof SkinnedBottomSheet>>(null)

  const handleShowTimeRangeEditor = useCallback(
    (timeRange: Day['timeRange']) => {
      timeRangeRef.current[0] = timeRange[0]
      timeRangeRef.current[1] = timeRange[1]

      bottomSheetRef.current?.present()
    },
    []
  )

  return (
    <>
      <PageView title="My Schedule">
        <View style={styles.container}>
          {days.map(({ day, enabled, timeRange }) => (
            <ScheduleDayItem
              key={day}
              label={day}
              enabled={enabled}
              timeRange={timeRange}
              onPress={handleShowTimeRangeEditor}
            />
          ))}
        </View>
      </PageView>
      <SkinnedBottomSheet
        ref={bottomSheetRef}
        title="Set your time"
        snapPoints={['30%']}
        onOpen={() =>
          timeRangeEditorRef.current?.setTimeRange(timeRangeRef.current)
        }
      >
        <TimeRangeEditor ref={timeRangeEditorRef} />
        <SkinnedTextButton text="Save" />
      </SkinnedBottomSheet>
    </>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  container: {
    gap: spacing[2],
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing[4],
  },
}))
