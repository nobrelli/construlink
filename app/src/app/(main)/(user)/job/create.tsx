import {
  AlertState,
  ClAlert,
  type ClAlertHandleProps,
} from '@/components/ClAlert'
import { ControlledDateTimePicker } from '@/components/ClDateTimePicker'
import { ClPageView } from '@/components/ClPageView'
import { ClRadioInput } from '@/components/ClRadio'
import { ClSpinner } from '@/components/ClSpinner'
import { ClSwitchButton } from '@/components/ClSwitchButton'
import { ClText } from '@/components/ClText'
import { ClTextButton } from '@/components/ClTextButton'
import { ClWebViewControl } from '@/components/ClWebViewControl'
import { ControlledSelectInput } from '@/components/controlled/ControlledSelectInput'
import { ControlledTextInput } from '@/components/controlled/ControlledTextInput'
import { createStyles } from '@/helpers/createStyles'
import { Cl } from '@/lib/options'
import { createJob } from '@/services/job'
import { useAuthStore } from '@/stores/auth'
import { useFormStore } from '@/stores/forms'
import { Spacing, Typo } from '@/theme'
import type { CreateJobFields } from '@/types/Fields'
import { useUpdateEffect } from '@reactuses/core'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated'

export default function AboutStep() {
  const createJobFields = useFormStore((state) => state.createJobFields)
  const createCompanyFields = useFormStore((state) => state.createCompanyFields)
  const setCreateJobFields = useFormStore((state) => state.setCreateJobFields)
  const resetFormStore = useFormStore((state) => state.reset)
  const userId = useAuthStore((state) => state.user)?.uid
  const role = useAuthStore((state) => state.role)
  const methods = useForm<CreateJobFields>({
    defaultValues: createJobFields,
  })
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods
  const styles = useStyles()
  const navigation = useNavigation()
  const postAs = watch('postAs')
  const alertRef = useRef<ClAlertHandleProps>(null)

  const showNoCompanyAlert = () => {
    alertRef.current?.show({
      title: 'Create a Company Profile First',
      description:
        'This ensures your job posts are linked to your company for better visibility and credibility.',
      state: AlertState.WARNING,
      secondaryButton: {
        text: 'Cancel',
        onPress: () => alertRef.current?.hide(),
      },
      primaryButton: {
        text: 'Create',
        onPress: () => {
          alertRef.current?.hide()
          router.push('/company/create')
        },
      },
    })
  }

  const onSubmit = async (data: CreateJobFields, isPreview = false) => {
    if (data.postAs === 'company' && !createCompanyFields) {
      // Check if the company form is filled up
      showNoCompanyAlert()
      return
    }

    if (isPreview) {
      router.push('/job/preview')
    } else {
      // biome-ignore lint/style/noNonNullAssertion:
      const result = await createJob(userId!, data)

      if (result) {
        router.push('/job/submitted')
      } else {
        alertRef.current?.show({
          title: 'Submission Failed',
          description:
            "We couldn't submit your form due to an error. Please check your internet connection and try again.",
          state: AlertState.ERROR,
          primaryButton: {
            text: 'Retry',
            onPress: () => alertRef.current?.hide(),
          },
        })
      }
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const removeListener = navigation.addListener('beforeRemove', (event) => {
      event.preventDefault()
      // Clear the form store
      resetFormStore()
      navigation.dispatch(event.data.action)
    })

    const unsubscribe = useFormStore.subscribe((state) => {
      setValue('description', state.createJobFields.description ?? '', {
        shouldValidate: true,
      })
    })

    return () => {
      removeListener()
      unsubscribe()
    }
  }, [])

  useUpdateEffect(() => {
    if (postAs === 'company' && !createCompanyFields) showNoCompanyAlert()
  }, [postAs])

  return (
    <>
      <ClPageView>
        <View style={{ gap: Spacing[6] }}>
          <FormProvider {...methods}>
            <Controller
              name="postAs"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <ClRadioInput
                  label="Post as"
                  options={Cl.postAs}
                  value={field.value ?? ''}
                  contentContainerStyle={{ flexDirection: 'row' }}
                  radioInputStyles={{ flex: 1 }}
                  onChange={field.onChange}
                />
              )}
            />
            <ControlledTextInput
              name="title"
              control={control}
              rules={{
                required: true,
              }}
              textInputOptions={{
                label: 'Job Title',
                placeholder: 'Brick mason',
                size: 'small',
              }}
            />
            <ControlledSelectInput
              name="category"
              control={control}
              rules={{
                required: true,
              }}
              options={Cl.categories}
              selectInputOptions={{
                label: 'Category',
                placeholder: 'Select',
                size: 'small',
              }}
            />
            <ControlledSelectInput
              name="employmentType"
              control={control}
              rules={{
                required: true,
              }}
              options={Cl.employmentTypes}
              selectInputOptions={{
                label: 'Employment Type',
                placeholder: 'Select',
                size: 'small',
              }}
            />
            <View style={{ display: 'none' }}>
              <ControlledTextInput
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                textInputOptions={{
                  label: 'Description',
                  placeholder: 'Tap to edit...',
                  size: 'small',
                  numberOfLines: 3,
                  readOnly: true,
                  multiline: true,
                  inputFieldStyle: {
                    verticalAlign: 'top',
                  },
                }}
              />
            </View>
            <ClWebViewControl
              label="Description"
              html={getValues('description') ?? ''}
              valid={errors.description === undefined}
              routeToEditor="/job/description-editor"
            />
            <ControlledTextInput
              name="location"
              control={control}
              rules={{
                required: true,
              }}
              textInputOptions={{
                label: 'Location',
                placeholder: 'Odiongan, Romblon',
                size: 'small',
              }}
            />
            <PaySection />
            <ControlledDateTimePicker
              name="deadline"
              control={control}
              textInputOptions={{
                label: 'Application Deadline',
                placeholder: 'Pick a date',
                size: 'small',
              }}
            />
            <View style={styles.row}>
              <ClTextButton
                text="Preview"
                variant="outline"
                onPress={handleSubmit((data) => onSubmit(data, true))}
                bodyStyle={{ flex: 1 }}
              />
              <ClTextButton
                text="Submit"
                onPress={handleSubmit((data) => onSubmit(data))}
                bodyStyle={{ flex: 1 }}
              />
            </View>
          </FormProvider>
        </View>
      </ClPageView>
      <ClAlert ref={alertRef} />
      {isSubmitting && <ClSpinner transluscent />}
    </>
  )
}

function PaySection() {
  const styles = useStyles()
  const {
    control,
    register,
    unregister,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<CreateJobFields>()
  const [rate, isUsingRange, payAmountMin, payAmountMax] = useWatch({
    control,
    name: ['rate', 'isUsingRange', 'payAmountMin', 'payAmountMax'],
  })

  useUpdateEffect(() => {
    if (rate) {
      register('payAmount', { required: true, min: 0 })
    } else {
      unregister('payAmount')
    }
  }, [rate])

  useUpdateEffect(() => {
    if (rate) {
      register('payAmountMin', {
        required: true,
        validate: {
          shouldNotBeEqual: (value) => {
            if (value === payAmountMax) return 'Should not equal'
          },
          shouldBeLessThanMax: (value) => {
            if (value > payAmountMax) return 'Should be less than max'
          },
        },
      })
      register('payAmountMax', {
        required: true,
        validate: {
          shouldNotBeEqual: (value) => {
            if (value === payAmountMin) return 'Should not equal'
          },
          shouldBeMoreThanMin: (value) => {
            if (value < payAmountMin) return 'Should be more than min'
          },
        },
      })
    } else {
      unregister('payAmountMin')
      unregister('payAmountMax')
    }
  }, [isUsingRange, payAmountMin, payAmountMax])

  return (
    <>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <ControlledSelectInput
            name="rate"
            control={control}
            options={Cl.ratePeriods}
            selectInputOptions={{
              label: 'Pay Rate',
              placeholder: 'Select',
              size: 'small',
            }}
          />
        </View>
        {rate && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <View style={{ alignItems: 'center' }}>
              <ClText
                style={{
                  marginBottom: Spacing[3],
                  fontSize: Typo.presets.sm.fontSize,
                  lineHeight: Typo.presets.xs.lineHeight,
                }}
              >
                Use range
              </ClText>
              <ClSwitchButton
                active={false}
                onChange={(enabled) => setValue('isUsingRange', enabled)}
              />
            </View>
          </Animated.View>
        )}
      </View>
      {rate && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          {!isUsingRange ? (
            <ControlledTextInput
              name="payAmount"
              control={control}
              rules={{}}
              textInputOptions={{
                label: 'Pay Amount',
                left: <ClText>PHP</ClText>,
                size: 'small',
                inputMode: 'numeric',
              }}
            />
          ) : (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <ControlledTextInput
                  name="payAmountMin"
                  control={control}
                  textInputOptions={{
                    label: 'Minimum',
                    left: <ClText>PHP</ClText>,
                    size: 'small',
                    inputMode: 'numeric',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ControlledTextInput
                  name="payAmountMax"
                  control={control}
                  textInputOptions={{
                    label: 'Maximum',
                    left: <ClText>PHP</ClText>,
                    size: 'small',
                    inputMode: 'numeric',
                  }}
                />
              </View>
            </View>
          )}
        </Animated.View>
      )}
    </>
  )
}

const useStyles = createStyles(({ colors, spacing, sizes, typo }) => ({
  row: {
    flexDirection: 'row',
    gap: spacing[4],
  },
}))
