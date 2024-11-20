import { PageView } from '@/components/PageView'
import {
  type RadioOption,
  SkinnedRadioInput,
} from '@/components/skinned/SkinnedRadio'

const options: RadioOption[] = [
  {
    label:
      'I own a company and I want to hire tradespeople to accomplish projects.',
    value: 1,
  },
  {
    label: 'I only want to hire tradespeople to finish a task or do repairs.',
    value: 0,
  },
]

export default function CreateJob() {
  return (
    <PageView>
      <SkinnedRadioInput options={options} />
    </PageView>
  )
}
