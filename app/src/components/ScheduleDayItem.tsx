import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useState } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { SkinnedSwitchButton } from './skinned/SkinnedSwitchButton'
import { SkinnedText } from './skinned/SkinnedText'

export interface Day {
  day: string
  enabled: boolean
  timeRange: [string, string]
}

interface ScheduleDayItemProps {
  label: string
  timeRange: Day['timeRange']
  enabled: boolean
  onPress: (timeRange: Day['timeRange']) => void
}

export function ScheduleDayItem({
  label,
  enabled,
  timeRange,
  onPress,
}: ScheduleDayItemProps) {
  const [isEnabled, setIsEnabled] = useState(enabled)
  const styles = useStyles({ enabled: isEnabled })

  return (
    <View style={styles.container}>
      <View style={styles.buttonWithLabel}>
        <SkinnedSwitchButton active={enabled} onChange={setIsEnabled} />
        <SkinnedText style={styles.label}>{label}</SkinnedText>
      </View>
      {isEnabled && (
        <Animated.View
          style={styles.timeContainer}
          entering={FadeInRight}
          exiting={FadeOutRight}
        >
          <TouchableOpacity
            style={styles.timeInline}
            onPress={() => onPress(timeRange)}
          >
            <SkinnedText style={styles.time}>
              {timeRange.join(' - ')}
            </SkinnedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

const useStyles = createStyles(
  ({ colors, spacing, sizes, typo }, { enabled }: { enabled: boolean }) => ({
    container: {
      flexDirection: 'row',
      gap: spacing[4],
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: sizes.borderWidth.thin,
      borderRadius: sizes.radius['2xl'],
      borderColor: resolveColor(colors.neutral[800], colors.neutral[200]),
      backgroundColor: resolveColor(
        enabled ? colors.neutral[800] : 'transparent',
        enabled ? colors.neutral[100] : 'transparent'
      ),
      padding: spacing[4],
    },
    buttonWithLabel: {
      flexDirection: 'row',
      gap: spacing[2],
      alignItems: 'center',
    },
    label: {
      fontFamily: typo.family.semiBold,
      color: enabled ? colors.primaryText : colors.secondaryText,
    },
    timeContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1],
      borderRadius: sizes.radius.lg,
    },
    timeInline: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    time: {
      color: colors.secondaryText,
      fontFamily: typo.family.semiBold,
      fontSize: typo.presets.sm.fontSize,
    },
    timeIcon: {
      color: colors.secondaryText,
      fontSize: typo.presets.sm.fontSize,
    },
  })
)
