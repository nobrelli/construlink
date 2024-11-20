import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { type ReactElement, memo } from 'react'
import { type ScrollViewProps, View } from 'react-native'
import Animated, { FadeInLeft, FadeOut } from 'react-native-reanimated'
import { SkinnedText } from './skinned/SkinnedText'

interface IPageViewProps extends ScrollViewProps {
  icon: ReactElement
  title: string
  subtitle: string
}

export const PageView = (props: Partial<IPageViewProps>) => {
  useRenderCount(`PageView: ${props.title}`)

  const { icon, title, subtitle, children, contentContainerStyle, ...rest } =
    props
  const styles = useStyles()

  return (
    <Animated.ScrollView
      entering={FadeInLeft}
      exiting={FadeOut}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...rest}
    >
      {(icon || title || subtitle) && (
        <View style={styles.pageHeader}>
          {icon && icon}
          {title && (
            <SkinnedText type="h5" style={styles.title}>
              {title}
            </SkinnedText>
          )}
          {subtitle && (
            <SkinnedText type="lead" dim>
              {subtitle}
            </SkinnedText>
          )}
        </View>
      )}
      {children}
    </Animated.ScrollView>
  )
}

const useStyles = createStyles(({ spacing, typo }) => ({
  container: {
    gap: spacing[8],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  pageHeader: {
    gap: spacing[2],
    alignSelf: 'center',
  },
  title: {
    fontFamily: typo.family.semiBold,
  },
}))
