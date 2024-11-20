import { createStyles } from '@/helpers/createStyles'
import { IconSet } from '@/types/Icons'
import type { Href } from 'expo-router'
import Animated from 'react-native-reanimated'
import { Icon } from './Icon'

interface FabItem {
  title: string
  href: Href
}

export function Fab() {
  const styles = useStyles()

  return (
    <Animated.View style={[styles.fabButton]}>
      <Icon set={IconSet.MaterialCommunityIcons} name="plus" />
    </Animated.View>
  )
}

const useStyles = createStyles(({ colors, sizes, spacing, typo }) => ({
  fabButton: {},
}))
