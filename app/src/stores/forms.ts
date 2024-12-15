import { Role } from '@/types/Enums'
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'

type State = {
  jobDescription: string
}

type Action = {
  setJobDescription: (html: string) => void
}

export const useFormStore = create<State & Action>()((set) => ({
  jobDescription: '',
  setJobDescription: (html) => set({ jobDescription: html }),
}))
