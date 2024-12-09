import { Role } from '@/types/Enums'
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'

type State = {
  role: Role | null
  user: FirebaseAuthTypes.User | null
  credentialToVerify: string
}

type Action = {
  setRole: (role: Role | null) => void
  setUser: (user: FirebaseAuthTypes.User | null) => void
  setCredentialToVerify: (value: string) => void
}

export const useAuthStore = create<State & Action>()((set) => ({
  role: null,
  user: null,
  credentialToVerify: '',
  setRole: (role) => set({ role }),
  setUser: (user) => set({ user }),
  setCredentialToVerify: (value) => set({ credentialToVerify: value }),
}))

export const isEmployer = () => useAuthStore.getState().role === Role.EMPLOYER
