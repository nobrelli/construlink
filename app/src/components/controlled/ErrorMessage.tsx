import { resolveColor } from '@/helpers/resolveColor'
import { useAppStore } from '@/stores/app'
import { Typo } from '@/theme'
import { type TextProps, View } from 'react-native'
import { ClText } from '../ClText'

export default ({ message, ...rest }: TextProps & { message?: string }) => {
  const colors = useAppStore((state) => state.colors)

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
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
    </View>
  )
}
