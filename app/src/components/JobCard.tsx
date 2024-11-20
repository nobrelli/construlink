import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { View } from 'react-native'
import { SkinnedText } from './skinned/SkinnedText'

interface JobCardProps {
  title: string
  company: string
  address: string
  duration: string
}

export function JobCard(props: JobCardProps) {
  const { title, company, address, duration } = props
  const styles = useStyles()

  return (
    <View style={styles.card}>
      <SkinnedText weight="bold" style={styles.title}>
        {title}
      </SkinnedText>
      <View>
        <SkinnedText>{company}</SkinnedText>
        <SkinnedText>{address}</SkinnedText>
      </View>
      <SkinnedText type="helper" dim>
        Posted {duration} ago
      </SkinnedText>
    </View>
  )
}

const useStyles = createStyles(({ colors, sizes, spacing, typo }) => ({
  card: {
    backgroundColor: resolveColor(colors.neutral[800], colors.neutral[100]),
    borderRadius: sizes.radius['2xl'],
    padding: spacing[5],
    flex: 1,
    gap: spacing[3],
  },
  title: {
    fontSize: typo.presets.lg.fontSize,
  },
}))
