import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import type { Status } from '@/types/Enums'
import { IconSet } from '@/types/Icons'
import { router } from 'expo-router'
import { View } from 'react-native'
import { ClSpringAnimatedPressable } from '../ClAnimated'
import { ClAvatar } from '../ClAvatar'
import { ClIcon } from '../ClIcon'
import { ClText } from '../ClText'

export interface TradespersonProps {
  userId: string
  name: string
  expertise: string
  proximity: string
  rating: number
  badges?: string
  status?: Status
}

export function TradespersonCard(props: TradespersonProps) {
  const { userId, name, expertise, proximity, rating, badges, status } = props
  const styles = useStyles()

  const handleViewProfile = () => {
    router.navigate({
      pathname: '/(main)/(user)/users/[userId]',
      params: {
        userId,
      },
    })
  }

  return (
    <ClSpringAnimatedPressable style={styles.card} onPress={handleViewProfile}>
      <View style={styles.left}>
        <ClAvatar size="lg" status={status} />
      </View>
      <View style={styles.mid}>
        <View>
          <ClText
            type="lead"
            weight="bold"
            style={styles.title}
            numberOfLines={1}
          >
            {name}
          </ClText>
          <ClText>{expertise}</ClText>
        </View>
        <View>
          <ClText type="helper" dim>
            {proximity}
          </ClText>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.rating}>
          <ClText type="helper">{rating}</ClText>
          <ClIcon
            set={IconSet.MaterialCommunityIcons}
            name="star"
            color={styles.icon.color}
            size={styles.icon.fontSize}
          />
        </View>
      </View>
    </ClSpringAnimatedPressable>
  )
}

const useStyles = createStyles(({ colors, sizes, spacing, typo }) => ({
  card: {
    flexDirection: 'row',
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
    borderWidth: sizes.borderWidth.thin,
    borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[4],
  },
  title: {
    fontSize: typo.presets.lg.fontSize,
    lineHeight: typo.presets.sm.lineHeight,
  },
  left: {
    justifyContent: 'center',
  },
  mid: {
    alignItems: 'flex-start',
    flex: 1,
    gap: spacing[2],
  },
  right: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  icon: {
    color: resolveColor(colors.accent.base, colors.brand.base),
    fontSize: sizes.icon.sm,
  },
}))
