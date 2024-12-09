import type { ClBottomSheet } from '@/components/ClBottomSheet'
import { ClPageView } from '@/components/ClPageView'
import { type Day, ScheduleDayItem } from '@/components/ScheduleDayItem'
import { TimeRangeEditorSheet } from '@/components/sheets/TimeRangeEditorSheet'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { type ComponentRef, useCallback, useRef } from 'react'
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
  const bottomSheetRef = useRef<ComponentRef<typeof ClBottomSheet>>(null)

  const handleShowTimeRangeEditor = useCallback(
    (timeRange: Day['timeRange']) => {
      bottomSheetRef.current?.present(timeRange)
    },
    []
  )

  return (
    <>
      <ClPageView title="My Schedule">
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
      </ClPageView>
      <TimeRangeEditorSheet ref={bottomSheetRef} />
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
