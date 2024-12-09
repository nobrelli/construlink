import { default as Colors, type Scheme } from '@/theme/palette'
import { Appearance } from 'react-native'
import { create } from 'zustand'

type State = {
  mode: Scheme
  colors: typeof Colors.light | typeof Colors.dark
}

type Action = {
  changeScheme: (scheme: Scheme) => void
}

const deviceScheme = Appearance.getColorScheme() as Scheme

export const useThemeStore = create<State & Action>()((set) => ({
  mode: deviceScheme,
  colors: Colors[deviceScheme],
  changeScheme: (scheme) =>
    set({
      mode: scheme,
      colors: Colors[scheme],
    }),
}))
