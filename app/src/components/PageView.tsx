import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { type ReactElement, memo } from 'react'
import { type ScrollViewProps, View } from 'react-native'
import Animated, { FadeInLeft, FadeOut } from 'react-native-reanimated'
import { SkinnedText } from './skinned/SkinnedText'

interface IPageViewProps extends ScrollViewProps {
  icon: ReactElement
  title: string | ReactElement
  subtitle: string | ReactElement
  scrollable?: boolean
}

export const PageView = (props: Partial<IPageViewProps>) => {
  useRenderCount(`PageView: ${props.title}`)

  const {
    icon,
    title,
    subtitle,
    children,
    contentContainerStyle,
    scrollable = true,
    ...rest
  } = props
  const styles = useStyles()

  const Container = scrollable ? Animated.ScrollView : Animated.View

  return (
    <Container
      entering={FadeInLeft}
      exiting={FadeOut}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={!scrollable && [styles.container, contentContainerStyle]}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...rest}
    >
      {(icon || title || subtitle) && (
        <View style={styles.pageHeader}>
          {icon && icon}
          {typeof title === 'string' ? (
            <SkinnedText type="h5" style={styles.title}>
              {title}
            </SkinnedText>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <SkinnedText type="lead" dim>
              {subtitle}
            </SkinnedText>
          ) : (
            subtitle
          )}
        </View>
      )}
      {children}
    </Container>
  )
}

const useStyles = createStyles(({ spacing, typo }) => ({
  container: {
    gap: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  pageHeader: {
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  title: {
    fontFamily: typo.family.semiBold,
  },
}))
