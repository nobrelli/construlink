import { ClPageView } from '@/components/ClPageView'
import {
  ClSelectInput,
  type SelectInputOption,
} from '@/components/ClSelectInput'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { Spacing } from '@/theme'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const options: SelectInputOption[] = [
  {
    label: 'Electrician',
    value: 0,
  },
  {
    label: 'Plumber',
    value: 1,
  },
  {
    label: 'Carpenter',
    value: 2,
  },
  {
    label: 'Mason',
    value: 3,
  },
  {
    label: 'Painter',
    value: 4,
  },
  {
    label: 'Roofer',
    value: 5,
  },
  {
    label: 'Welder',
    value: 6,
  },
  {
    label: 'Tiler',
    value: 7,
  },
  {
    label: 'Steel Worker',
    value: 8,
  },
  {
    label: 'Landscaper',
    value: 9,
  },
  {
    label: 'Excavator',
    value: 10,
  },
  {
    label: 'Surveyor',
    value: 11,
  },
  {
    label: 'General Laborer',
    value: 12,
  },
]

const employmentTypes: SelectInputOption[] = [
  {
    label: 'Full-time',
    value: 'fulltime',
  },
  {
    label: 'Part-time',
    value: 'parttime',
  },
  {
    label: 'Contract',
    value: 'contract',
  },
]

export default function CreateJob() {
  const { control } = useForm()

  return (
    <ClPageView>
      <View style={{ gap: Spacing[6] }}>
        <ControlledTextInput
          name="jobTitle"
          control={control}
          textInputOptions={{
            label: 'Job Title',
            placeholder: 'Brick mason',
            size: 'small',
          }}
        />
        <ClSelectInput
          label="Category"
          options={options}
          placeholder="Select"
          size="small"
        />
        <ClSelectInput
          label="Employment Type"
          options={employmentTypes}
          placeholder="Select"
          size="small"
        />
        <ControlledTextInput
          name="jobLocation"
          control={control}
          textInputOptions={{
            label: 'Location',
            placeholder: 'Manila, Philippines',
            size: 'small',
          }}
        />
      </View>
    </ClPageView>
  )
}
