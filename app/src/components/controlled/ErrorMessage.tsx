import { resolveColor } from '@/helpers/resolveColor'
import { useThemeStore } from '@/stores/theme'
import { Typo } from '@/theme'
import type { TextProps } from 'react-native'
import { ClText } from '../ClText'

export default ({ message, ...rest }: TextProps & { message?: string }) => {
  const colors = useThemeStore((state) => state.colors)

  return (
    <ClText
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
    </ClText>
  )
}
