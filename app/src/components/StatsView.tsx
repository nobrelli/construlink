import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import type { IconType } from '@/types/Icons'
import { useRef, useState } from 'react'
import {
  FlatList,
  LayoutChangeEvent,
  type ListRenderItemInfo,
  View,
} from 'react-native'
import { ClSpringAnimatedPressable } from './ClAnimated'
import { ClIcon } from './ClIcon'
import { ClText } from './ClText'

export interface StatItem {
  icon: IconType
  label: string
  value: string | number
  onPress?: () => void
}

interface StatsViewProps {
  items: StatItem[]
}

const NUM_COLS = 2

export function StatsView({ items }: StatsViewProps) {
  const [width, setWidth] = useState(0)
  const styles = useStyles({ width, cols: NUM_COLS })

  const renderItem = ({ item, index }: ListRenderItemInfo<StatItem>) => (
    <ClSpringAnimatedPressable
      onPress={item.onPress}
      style={[
        styles.stat,
        (index + 1) % NUM_COLS === 0 && {
          marginRight: 0,
        },
      ]}
    >
      <ClIcon
        {...item.icon}
        color={styles.icon.color}
        size={styles.icon.fontSize}
      />
      <View>
        <ClText weight="bold" style={styles.value}>
          {item.value}
        </ClText>
        <ClText style={styles.label} dim>
          {item.label}
        </ClText>
      </View>
    </ClSpringAnimatedPressable>
  )

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      numColumns={NUM_COLS}
      style={styles.container}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      showsVerticalScrollIndicator={false}
    />
  )
}

const useStyles = createStyles(
  (
    { colors, spacing, sizes, typo },
    { width, cols }: { width: number; cols: number }
  ) => ({
    container: {},
    stat: {
      backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
      padding: spacing[4],
      borderRadius: sizes.radius['2xl'],
      borderWidth: sizes.borderWidth.thin,
      borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
      justifyContent: 'center',
      alignItems: 'center',
      width: Math.floor((width - spacing[4] * (cols - 1)) / cols),
      height: spacing[44],
      marginRight: spacing[4],
      marginBottom: spacing[4],
      gap: spacing[3],
    },
    icon: {
      fontSize: sizes.icon.xl,
      color: resolveColor(colors.accent.base, colors.brand.base),
    },
    label: {
      textAlign: 'center',
      fontSize: typo.presets.sm.fontSize,
      lineHeight: typo.presets.sm.lineHeight,
      marginTop: spacing[2],
    },
    value: {
      textAlign: 'center',
      fontSize: typo.presets.xl.fontSize,
    },
  })
)
