import { resolveColor } from '@/helpers/resolveColor'
import { useThemeStore } from '@/stores/theme'
import { Typo } from '@/theme'
import type { TextProps } from 'react-native'
import { SkinnedText } from '../skinned/SkinnedText'

export default ({ message, ...rest }: TextProps & { message?: string }) => {
  const colors = useThemeStore((state) => state.colors)

  return (
    <SkinnedText
      type="helper"
      style={{
        color: resolveColor(
          colors.states.danger[300],
          colors.states.danger[400]
        ),
        fontFamily: Typo.family.semiBold,
      }}
      {...rest}
    >
      {message}
    </SkinnedText>
  )
}
