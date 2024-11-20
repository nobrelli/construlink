import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useRenderCount } from '@/hooks/useRenderCount'
import type { IconType } from '@/types/Icons'
import React, { type ReactElement } from 'react'
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native'
import { Icon } from './Icon'
import { SkinnedText } from './skinned/SkinnedText'

export interface MenuItem {
  title: string
  icon?: IconType
  right?: ReactElement
  onPress?: () => void
}

interface MenuProps {
  items: MenuItem[]
  containerStyle?: StyleProp<ViewStyle>
}

export function Menu(props: MenuProps) {
  useRenderCount('Menu')

  const { items, containerStyle } = props
  const styles = useStyles()

  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey:
        <MenuItem key={index} {...item} index={index} />
      ))}
    </View>
  )
}

function MenuItem({ index, ...item }: MenuItem & { index: number }) {
  const styles = useStyles()
  const Component = item.onPress ? Pressable : View

  return (
    <Component style={[styles.item, !index && { borderTopWidth: 0 }]}>
      <View style={styles.left}>
        {item.icon && (
          <Icon
            set={item.icon.set}
            name={item.icon.name}
            color={styles.icon.color}
            size={styles.icon.fontSize}
          />
        )}
        <SkinnedText style={styles.title}>{item.title}</SkinnedText>
      </View>
      {item.right && <View style={styles.right}>{item.right}</View>}
    </Component>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  container: {
    overflow: 'hidden',
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
    borderWidth: sizes.borderWidth.thin,
    borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
  },
  item: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: sizes.borderWidth.thin,
    borderTopColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: typo.family.semiBold,
  },
  left: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  right: {},
  icon: {
    color: resolveColor(colors.accent.base, colors.brand.base),
    fontSize: typo.presets['2xl'].fontSize,
  },
}))
