import { create } from 'zustand'

// biome-ignore lint/style/useEnumInitializers:
export enum Role {
  EMPLOYER,
  TRADESPERSON,
}

type State = {
  role: Role
  credentialToVerify: string
}

type Action = {
  setCredentialToVerify: (value: string) => void
}

export const useAuthStore = create<State & Action>()((set) => ({
  role: Role.EMPLOYER,
  credentialToVerify: '',
  setCredentialToVerify: (value) => set({ credentialToVerify: value }),
}))

export const isEmployer = useAuthStore.getState().role === Role.EMPLOYER
