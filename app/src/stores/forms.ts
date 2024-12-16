import type { CreateJobFields } from '@/types/Fields'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  createJobFields: Partial<CreateJobFields>
}

type Action = {
  setCreateJobFields: (fields: Partial<CreateJobFields>) => void
  reset: () => void
}

const initialState: State = {
  createJobFields: {
    category: '',
    deadline: '',
    description: '',
    employmentType: '',
    isUsingRange: false,
    location: '',
    postAs: 'individual',
    rate: '',
    title: '',
  },
}

export const useFormStore = create<State & Action>()(
  immer((set) => ({
    ...initialState,
    setCreateJobFields: (fields) => set({ createJobFields: fields }),
    reset: () => set(initialState),
  }))
)
