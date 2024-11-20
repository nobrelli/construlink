import { type GlyphMap, IconSet, type IconType } from '@/types/Icons'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import type { IconProps } from '@expo/vector-icons/build/createIconSet'

interface CustomIconProps extends Omit<IconProps<string>, 'name'> {
  set: IconType['set']
  name: IconType['name']
}

export function Icon({ set, name, ...props }: CustomIconProps) {
  return (
    <>
      {set === IconSet.MaterialIcon && (
        <MaterialIcons {...props} name={name as GlyphMap['MaterialIcons']} />
      )}
      {set === IconSet.MaterialCommunityIcons && (
        <MaterialCommunityIcons
          {...props}
          name={name as GlyphMap['MaterialCommunityIcons']}
        />
      )}
      {set === IconSet.Ionicons && (
        <Ionicons {...props} name={name as GlyphMap['Ionicons']} />
      )}
    </>
  )
}
