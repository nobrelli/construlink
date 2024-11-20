import { create } from 'zustand'

// biome-ignore lint/style/useEnumInitializers:
export enum Role {
  EMPLOYER,
  TRADESPERSON,
}

type State = {
  role: Role
}

export const useAuthStore = create<State>()((set) => ({
  role: Role.EMPLOYER,
}))

export const isEmployer = useAuthStore.getState().role === Role.EMPLOYER
