import type {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

// biome-ignore lint/style/useEnumInitializers:
export enum IconSet {
  MaterialIcon,
  MaterialCommunityIcons,
  Ionicons,
}

export interface GlyphMap {
  MaterialIcons: keyof typeof MaterialIcons.glyphMap
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap
  Ionicons: keyof typeof Ionicons.glyphMap
}

export type IconType =
  | { set: IconSet.MaterialIcon; name: GlyphMap['MaterialIcons'] }
  | {
      set: IconSet.MaterialCommunityIcons
      name: GlyphMap['MaterialCommunityIcons']
    }
  | { set: IconSet.Ionicons; name: GlyphMap['Ionicons'] }
