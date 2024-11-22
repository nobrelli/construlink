import { IconSet } from '@/types/Icons'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useRef, useState } from 'react'
import { Icon } from '../Icon'
import { SkinnedBottomSheet } from './SkinnedBottomSheet'
import { type RadioOption, SkinnedRadioInput } from './SkinnedRadio'
import {
  SkinnedTextInput,
  type SkinnedTextInputProps,
} from './SkinnedTextInput'

export interface SelectInputOption {
  label: string
  value: string | number
  selected?: boolean
}

interface SkinnedSelectInputProps
  extends Partial<Omit<SkinnedTextInputProps, 'value'>> {
  value?: SelectInputOption['value']
  sheetTitle?: string
  multiple?: boolean
  options: SelectInputOption[]
}

export function SkinnedSelectInput(props: SkinnedSelectInputProps) {
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
      <SkinnedTextInput
        {...rest}
        readOnly
        value={
          options.find((option) => option.value === _value)?.label.toString() ??
          ''
        }
        onPress={handleOnPress}
        right={
          <Icon set={IconSet.MaterialCommunityIcons} name="chevron-down" />
        }
      />
      <SkinnedBottomSheet
        ref={bottomSheetRef}
        title={sheetTitle ?? 'Select'}
        scrollable
        snapPoints={['70%']}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        enableDynamicSizing={false}
      >
        <SkinnedRadioInput
          value={_value}
          size="small"
          options={options}
          contentContainerStyle={{
            padding: 0,
          }}
          onChange={handleOnSelect}
        />
      </SkinnedBottomSheet>
    </>
  )
}
