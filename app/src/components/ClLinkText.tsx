import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { Link, type LinkProps } from 'expo-router'
import type { StyleProp, TextStyle } from 'react-native'
import { ClText } from './ClText'

export function ClLinkText({
  linkStyle,
  style,
  children,
  ...rest
}: LinkProps<string> & { linkStyle?: StyleProp<TextStyle> }) {
  const styles = useStyles()

  return (
    <Link style={linkStyle} {...rest}>
      <ClText type="paragraph" style={[styles.text, style]} dim>
        {children}
      </ClText>
    </Link>
  )
}

const useStyles = createStyles(({ colors, typo }) => ({
  text: {
    fontFamily: typo.family.semiBold,
    color: resolveColor(colors.accent[500], colors.brand[600]),
  },
}))
