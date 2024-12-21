import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { capitalizeFirst } from '@/helpers/stringUtils'
import { Cl } from '@/lib/options'
import typography from '@/theme/typography'
import { IconSet } from '@/types/Icons'
import { View } from 'react-native'
import { ClIconText } from '../ClIconText'
import { ClText } from '../ClText'

interface JobCardProps {
  title: string
  author: string
  location: string
  description: string
  duration: string
  employmentType: string
  pay?: string
}

export function JobCard(props: JobCardProps) {
  const { title, author, location, description, duration, employmentType } =
    props
  const styles = useStyles()

  return (
    <View style={styles.card}>
      <View>
        <ClText
          weight="bold"
          style={{ fontSize: typography.presets.lg.fontSize }}
        >
          {title}
        </ClText>
        <ClText style={{ fontSize: typography.presets.base.fontSize }}>
          {author}
        </ClText>
      </View>
      <View>
        <ClIconText
          icon={{
            set: IconSet.MaterialCommunityIcons,
            name: 'map-marker',
          }}
          text={location}
          style={{ fontSize: typography.presets.sm.fontSize }}
        />
        <ClIconText
          icon={{
            set: IconSet.MaterialCommunityIcons,
            name: 'briefcase',
          }}
          // biome-ignore lint/style/noNonNullAssertion:
          text={
            Cl.employmentTypes.find((option) => option.value === employmentType)
              ?.label!
          }
          style={{ fontSize: typography.presets.sm.fontSize }}
        />
      </View>
      <ClText
        style={{ fontSize: typography.presets.xs.fontSize }}
        type="helper"
        dim
      >
        Posted {duration} ago
      </ClText>
    </View>
  )
}

const useStyles = createStyles(({ colors, sizes, spacing, typo }) => ({
  card: {
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
    borderWidth: sizes.borderWidth.thin,
    borderColor: resolveColor(colors.neutral[700], colors.neutral[200]),
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[4],
  },
}))
