import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { timeToDate } from '@/helpers/timeToDate'
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useRef, useState } from 'react'
import React from 'react'
import { Platform, Pressable, View } from 'react-native'
import { ClText } from './ClText'
import type { Day } from './ScheduleDayItem'

interface TimeRangeEditorProps {
  timeRange?: Day['timeRange']
  onChange?: (timeValue: string) => void
}

export const TimeRangeEditor = ({
  timeRange,
  onChange,
}: TimeRangeEditorProps) => {
  const styles = useStyles()
  const [pickerVisible, setPickerVisible] = useState(false)
  const selectedType = useRef<'start' | 'end'>()
  const [_timeRange, setTimeRange] = useState<Day['timeRange'] | undefined>(
    timeRange
  )
  const convertedRange = {
    start: _timeRange && timeToDate(_timeRange[0]),
    end: _timeRange && timeToDate(_timeRange[1]),
  }

  const onTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    const formatted = new Date(event.nativeEvent.timestamp)
      .toLocaleTimeString('en-PH', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toUpperCase()

    setPickerVisible(false)

    setTimeRange((state) => [
      selectedType.current === 'start'
        ? formatted
        : (state as Day['timeRange'])[0],
      selectedType.current === 'end'
        ? formatted
        : (state as Day['timeRange'])[1],
    ])

    if (onChange) {
      onChange(formatted)
    }
  }

  const showTimePicker = (type: 'start' | 'end') => {
    selectedType.current = type

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: new Date(convertedRange[type] as Date),
        mode: 'time',
        is24Hour: false,
        onChange: onTimeChange,
      })
    } else {
      setPickerVisible(true)
    }
  }

  return (
    <>
      <View style={styles.timeRangeContainer}>
        <Pressable
          style={styles.timeContainer}
          onPress={() => showTimePicker('start')}
        >
          <ClText type="helper">Start</ClText>
          <ClText style={styles.time}>{_timeRange?.[0]}</ClText>
        </Pressable>
        <Pressable
          style={styles.timeContainer}
          onPress={() => showTimePicker('end')}
        >
          <ClText type="helper">End</ClText>
          <ClText style={styles.time}>{_timeRange?.[1]}</ClText>
        </Pressable>
      </View>
      {pickerVisible && selectedType.current && _timeRange && (
        <DateTimePicker
          value={new Date(convertedRange[selectedType.current] as Date)}
          mode="time"
          is24Hour={false}
          onChange={onTimeChange}
        />
      )}
    </>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  timeRangeContainer: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  timeContainer: {
    flex: 1,
    backgroundColor: resolveColor(colors.neutral[700], colors.neutral[100]),
    padding: spacing[2],
    borderRadius: sizes.radius['2xl'],
    alignItems: 'center',
  },
  time: {
    fontSize: typo.presets.base.fontSize,
    fontFamily: typo.family.semiBold,
  },
  timePickerContainer: {
    alignItems: 'center',
  },
}))
