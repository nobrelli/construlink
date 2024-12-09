import { IconSet } from '@/types/Icons'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useRef, useState } from 'react'
import { ClBottomSheet } from './ClBottomSheet'
import { ClIcon } from './ClIcon'
import { ClRadioInput, type RadioOption } from './ClRadio'
import { ClTextInput, type ClTextInputProps } from './ClTextInput'

export interface SelectInputOption {
  label: string
  value: string | number
  selected?: boolean
}

interface ClSelectInputProps extends Partial<Omit<ClTextInputProps, 'value'>> {
  value?: SelectInputOption['value']
  sheetTitle?: string
  multiple?: boolean
  options: SelectInputOption[]
}

export function ClSelectInput(props: ClSelectInputProps) {
  const { sheetTitle, options, value, ...rest } = props
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [_value, setValue] = useState(value)

  const handleOnPress = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  const handleOnSelect = useCallback((value: RadioOption['value']) => {
    setValue(value)
    bottomSheetRef.current?.dismiss()
  }, [])

  return (
    <>
      <ClTextInput
        {...rest}
        readOnly
        value={
          options.find((option) => option.value === _value)?.label.toString() ??
          ''
        }
        onPress={handleOnPress}
        right={
          <ClIcon set={IconSet.MaterialCommunityIcons} name="chevron-right" />
        }
      />
      <ClBottomSheet
        ref={bottomSheetRef}
        title={sheetTitle ?? 'Select'}
        scrollable
        snapPoints={['70%']}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        enableDynamicSizing={false}
      >
        <ClRadioInput
          value={_value}
          size="small"
          options={options}
          contentContainerStyle={{
            padding: 0,
          }}
          onChange={handleOnSelect}
        />
      </ClBottomSheet>
    </>
  )
}
