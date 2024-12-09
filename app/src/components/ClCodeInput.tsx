import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useMount } from '@reactuses/core'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  type NativeSyntheticEvent,
  Pressable,
  type TextInput as RNTextInput,
  type TextInputKeyPressEventData,
} from 'react-native'
import { ClTextInput } from './ClTextInput'

const MIN_LENGTH = 4

interface ClCodeInputProps {
  length: number
  code: string
  onDone: () => void
  onChange: (code: string) => void
}

export interface ClCodeInputHandleProps {
  focus: () => void
}

export const ClCodeInput = forwardRef<
  ClCodeInputHandleProps,
  Partial<ClCodeInputProps>
>(({ length = MIN_LENGTH, code, onChange, onDone }, ref) => {
  const styles = useStyles()
  const refs = useRef<RNTextInput[]>(Array(length).fill(null))
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const lastItem = length - 1

  const isDone = () => {
    return values.indexOf('') === -1
  }

  const changeValues = (value: string, index: number) => {
    setValues((prevValues) =>
      prevValues.map((prev, current) => (current === index ? value : prev))
    )
  }

  const focusPrevious = (index: number) => {
    if (index > 0 && !values[lastItem]) {
      refs.current[index - 1].focus()
    }
  }

  const focusNext = (index: number) => {
    if (index < lastItem) {
      refs.current[index + 1].focus()
    }
  }

  const resumeField = () => {
    const lastField = values.indexOf('')

    if (lastField >= 0) {
      refs.current[lastField].focus()
    } else {
      refs.current[lastItem].focus()
    }
  }

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!values[lastItem]) changeValues('', index - 1)

      focusPrevious(index)
    } else {
      focusNext(index)
    }
  }

  useMount(() => {
    // Populate
    if (code) {
      setValues(code.toString().split(''))
      refs.current[lastItem].focus()
    } else {
      refs.current[0].focus()
    }
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    onChange?.(values.join(''))

    if (isDone()) {
      refs.current[lastItem].blur()
      onDone?.()
    }
  }, [values])

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useImperativeHandle(
    ref,
    () => ({
      focus() {
        resumeField()
      },
    }),
    []
  )

  return (
    <Pressable style={styles.container} onPress={resumeField}>
      {values.map((value, index) => (
        <ClTextInput
          // biome-ignore lint/suspicious/noArrayIndexKey:
          key={index}
          ref={(el: RNTextInput) => {
            refs.current[index] = el
          }}
          value={value}
          inputMode="numeric"
          keyboardType="numeric"
          maxLength={1}
          inputFieldStyle={{
            textAlign: 'center',
          }}
          inputWrapperStyle={[
            styles.textInput,
            value !== '' && styles.textInputHasValue,
          ]}
          enterKeyHint="next"
          caretHidden={true}
          onChangeText={(val) => changeValues(val, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </Pressable>
  )
})

const useStyles = createStyles(({ spacing, sizes, colors }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
  },
  textInput: {
    width: spacing[11],
    paddingVertical: spacing[2],
    borderRadius: sizes.radius.full,
    pointerEvents: 'none',
  },
  textInputHasValue: {
    backgroundColor: resolveColor(colors.brand[800], colors.brand[50]),
  },
}))
