import { ClPageView } from '@/components/ClPageView'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { createStyles } from '@/helpers/createStyles'
import { useRenderCount } from '@/hooks/useRenderCount'
import { Feather } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

type Fields = {
  searchQuery: string
  location: string
}

export default function Search() {
  useRenderCount('Search Screen')

  const styles = useStyles()

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { isSubmitting, isValid, errors },
  } = useForm<Fields>({
    defaultValues: {
      searchQuery: '',
      location: '',
    },
  })

  return (
    <ClPageView>
      <View style={styles.searchSection}>
        <ControlledTextInput
          name="searchQuery"
          control={control}
          rules={{
            required: {
              message: 'Required field',
              value: true,
            },
          }}
          textInputOptions={{
            size: 'small',
            placeholder: 'Search trade jobs',
            left: <Feather name="search" />,
            autoFocus: true,
            autoCapitalize: 'none',
          }}
        />
      </View>
    </ClPageView>
  )
}

const useStyles = createStyles(({ colors, typo, spacing }) => ({
  searchSection: {
    gap: spacing[4],
  },
  findButton: {
    marginTop: spacing[6],
  },
  searchSuggestionsContainer: {
    gap: spacing[4],
  },
  searchSuggestion: {
    flexDirection: 'row',
    gap: spacing[4],
    alignItems: 'center',
  },
  searchSuggestionText: {
    color: colors.primaryText,
    fontFamily: typo.family.regular,
    fontSize: typo.variants.paragraph.fontSize,
    lineHeight: typo.variants.paragraph.lineHeight,
  },
  locations: {
    gap: spacing[4],
  },
}))
