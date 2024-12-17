import { createStyles } from '@/helpers/createStyles'
import type { Heading, TextType, Weight } from '@/theme/typography'
import type { TextProps } from 'react-native'
import { Text as RNText } from 'react-native'

export interface ClTextProps extends TextProps {
  type: TextType
  weight: Weight
  dim: boolean
}

export function ClText(props: Partial<ClTextProps>) {
  const {
    type = 'paragraph',
    weight = 'regular',
    dim = false,
    style,
    children,
    ...rest
  } = props

  const styles = useStyles({ type, dim, weight })

  return (
    <RNText style={[styles.text, style]} {...rest}>
      {children}
    </RNText>
  )
}

const useStyles = createStyles(
  ({ colors, typo }, { type, weight, dim }: ClTextProps) => {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

    return {
      text: {
        color: dim ? colors.secondaryText : colors.primaryText,
        fontFamily: headings.includes(type as Heading) ? 'bold' : weight,
        fontSize: typo.variants[type].fontSize,
        lineHeight: typo.variants[type].lineHeight,
      },
    }
  }
)
