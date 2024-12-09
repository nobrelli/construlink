import { ClTextInput, type ClTextInputProps } from './ClTextInput'

interface ClDateInputProps extends Partial<Omit<ClTextInputProps, 'value'>> {}

export function ClDateInput(props: ClDateInputProps) {
  const { ...rest } = props

  return (
    <></>
    // <ClTextInput
    //     {...rest}
    //     readOnly
    //     value={options.find(option => option.value === _value)?.label.toString() ?? ''}
    //     onPress={handleOnPress}
    //     right={<Icon set={IconSet.MaterialCommunityIcons} name="chevron-down" />}
    // />
  )
}
