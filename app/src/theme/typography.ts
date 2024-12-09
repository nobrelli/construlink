export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type Weight =
  | 'thin'
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black'
export type TextType = Heading | 'paragraph' | 'lead' | 'helper' | 'link'

const presets = {
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 32,
  },
  '2xl': {
    fontSize: 24,
    lineHeight: 36,
  },
  '3xl': {
    fontSize: 28,
    lineHeight: 40,
  },
  '4xl': {
    fontSize: 32,
    lineHeight: 44,
  },
  '5xl': {
    fontSize: 36,
    lineHeight: 48,
  },
  '6xl': {
    fontSize: 40,
    lineHeight: 52,
  },
}

const variants = {
  h1: presets['5xl'],
  h2: presets['4xl'],
  h3: presets['3xl'],
  h4: presets['2xl'],
  h5: presets.xl,
  h6: presets.lg,
  lead: presets.xl,
  paragraph: presets.base,
  helper: presets.sm,
  link: presets.base,
}

const family: Record<Weight, string> = {
  thin: 'thin',
  extraLight: 'extraLight',
  light: 'light',
  regular: 'regular',
  medium: 'medium',
  semiBold: 'semiBold',
  bold: 'bold',
  extraBold: 'extraBold',
  black: 'black',
}

export default {
  presets,
  variants,
  family,
}
