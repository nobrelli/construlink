import {
  SkinnedTextInput,
  type SkinnedTextInputProps,
} from './SkinnedTextInput'

interface SkinnedDateInputProps
  extends Partial<Omit<SkinnedTextInputProps, 'value'>> {}

export function SkinnedDateInput(props: SkinnedDateInputProps) {
  const { ...rest } = props

  return (
    <></>
    // <SkinnedTextInput
    //     {...rest}
    //     readOnly
    //     value={options.find(option => option.value === _value)?.label.toString() ?? ''}
    //     onPress={handleOnPress}
    //     right={<Icon set={IconSet.MaterialCommunityIcons} name="chevron-down" />}
    // />
  )
}
