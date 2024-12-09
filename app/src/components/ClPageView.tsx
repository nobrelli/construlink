import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { type ReactElement, memo } from 'react'
import { type ScrollViewProps, View } from 'react-native'
import Animated, { FadeInLeft, FadeOut } from 'react-native-reanimated'
import { ClText } from './ClText'

interface ClPageViewProps extends ScrollViewProps {
  icon: ReactElement
  title: string | ReactElement
  subtitle: string | ReactElement
  scrollable?: boolean
}

export const ClPageView = (props: Partial<ClPageViewProps>) => {
  useRenderCount('PageView')

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
            <ClText type="h5" style={styles.title}>
              {title}
            </ClText>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <ClText type="lead" dim>
              {subtitle}
            </ClText>
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
