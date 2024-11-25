import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { Link, type LinkProps } from 'expo-router'
import type { StyleProp, TextStyle } from 'react-native'
import { SkinnedText } from './SkinnedText'

export function SkinnedLinkText({
  linkStyle,
  style,
  children,
  ...rest
}: LinkProps<string> & { linkStyle?: StyleProp<TextStyle> }) {
  const styles = useStyles()

  return (
    <Link style={linkStyle} {...rest}>
      <SkinnedText type="paragraph" style={[styles.text, style]} dim>
        {children}
      </SkinnedText>
    </Link>
  )
}

const useStyles = createStyles(({ colors, typo }) => ({
  text: {
    fontFamily: typo.family.semiBold,
    color: resolveColor(colors.accent[500], colors.brand[600]),
  },
}))
