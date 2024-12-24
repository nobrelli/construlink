import { default as Colors, type Scheme } from '@/theme/palette'
import type { Notification } from 'expo-notifications'
import { Appearance } from 'react-native'
import { create } from 'zustand'

type State = {
  scheme: Scheme
  colors: typeof Colors.light | typeof Colors.dark
  pushToken: string
  notification: Notification | null
}

type Action = {
  changeScheme: (scheme: Scheme) => void
  setPushToken: (pushToken: string) => void
  setNotification: (notification: Notification) => void
}

const deviceScheme = Appearance.getColorScheme() as Scheme

export const useAppStore = create<State & Action>()((set) => ({
  scheme: deviceScheme,
  colors: Colors[deviceScheme],
  pushToken: '',
  notification: null,
  changeScheme: (scheme) =>
    set({
      scheme,
      colors: Colors[scheme],
    }),
  setPushToken: (pushToken) => set({ pushToken }),
  setNotification: (notification) => set({ notification }),
}))
