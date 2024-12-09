import { createStyles } from '@/helpers/createStyles'
import { IconSet } from '@/types/Icons'
import type { Href } from 'expo-router'
import Animated from 'react-native-reanimated'
import { ClIcon } from './ClIcon'

interface ClFabItem {
  title: string
  href: Href
}

export function ClFab() {
  const styles = useStyles()

  return (
    <Animated.View style={[styles.fabButton]}>
      <ClIcon set={IconSet.MaterialCommunityIcons} name="plus" />
    </Animated.View>
  )
}

const useStyles = createStyles(({ colors, sizes, spacing, typo }) => ({
  fabButton: {},
}))
