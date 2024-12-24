import { ClPageView } from '@/components/ClPageView'
import { ClTextButton } from '@/components/ClTextButton'
import { ControlledSelectInput } from '@/components/controlled/ControlledSelectInput'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { Cl } from '@/lib/options'
import { useFormStore } from '@/stores/forms'
import { Spacing } from '@/theme'
import type { CreateCompanyFields } from '@/types/Fields'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'

export default function CreateCompany() {
  const createCompanyFields = useFormStore((state) => state.createCompanyFields)
  const setCreateCompanyFields = useFormStore(
    (state) => state.setCreateCompanyFields
  )
  const { control, handleSubmit } = useForm<CreateCompanyFields>({
    defaultValues: createCompanyFields ?? {},
  })
  const navigation = useNavigation()

  const onSubmit: SubmitHandler<CreateCompanyFields> = (data) => {
    setCreateCompanyFields(data)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const removeListener = navigation.addListener('beforeRemove', (event) => {
      event.preventDefault()
      // Clear the form store
      setCreateCompanyFields(null)
      navigation.dispatch(event.data.action)
    })

    return removeListener
  }, [])

  return (
    <ClPageView>
      <View style={{ gap: Spacing[6] }}>
        {/* COMPANY LOGO HERE */}
        <ControlledTextInput
          name="name"
          control={control}
          rules={{ required: true }}
          textInputOptions={{
            label: 'Company Name',
            placeholder: 'ABC Construction Ltd.',
            size: 'small',
          }}
        />
        <ControlledTextInput
          name="description"
          control={control}
          rules={{ required: true }}
          textInputOptions={{
            label: 'Company Description',
            placeholder: 'Describe your company',
            size: 'small',
            multiline: true,
            numberOfLines: 4,
            inputFieldStyle: {
              verticalAlign: 'top',
            },
          }}
        />
        <ControlledSelectInput
          name="size"
          control={control}
          rules={{
            required: true,
          }}
          options={Cl.companySizes}
          selectInputOptions={{
            label: 'Company Size',
            placeholder: 'Select',
            size: 'small',
          }}
        />
        <ControlledTextInput
          name="location"
          control={control}
          rules={{ required: true }}
          textInputOptions={{
            label: 'Business Location',
            placeholder: 'Odiongan, Romblon',
            size: 'small',
          }}
        />
        <ClTextButton text="Continue" onPress={handleSubmit(onSubmit)} />
      </View>
    </ClPageView>
  )
}
