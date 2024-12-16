import type { RadioOption } from '@/components/ClRadio'
import type { SelectInputOption } from '@/components/ClSelectInput'

export namespace Cl {
  export const categories: SelectInputOption[] = [
    {
      label: 'Electrician',
      value: 0,
    },
    {
      label: 'Plumber',
      value: 1,
    },
    {
      label: 'Carpenter',
      value: 2,
    },
    {
      label: 'Mason',
      value: 3,
    },
    {
      label: 'Painter',
      value: 4,
    },
    {
      label: 'Roofer',
      value: 5,
    },
    {
      label: 'Welder',
      value: 6,
    },
    {
      label: 'Tiler',
      value: 7,
    },
    {
      label: 'Steel Worker',
      value: 8,
    },
    {
      label: 'Landscaper',
      value: 9,
    },
    {
      label: 'Excavator',
      value: 10,
    },
    {
      label: 'Surveyor',
      value: 11,
    },
    {
      label: 'General Laborer',
      value: 12,
    },
  ]

  export const employmentTypes: SelectInputOption[] = [
    {
      label: 'Full-time',
      value: 'fulltime',
    },
    {
      label: 'Part-time',
      value: 'parttime',
    },
    {
      label: 'Contract',
      value: 'contract',
    },
  ]

  export const ratePeriods: SelectInputOption[] = [
    {
      label: 'Hourly',
      value: 'hourly',
    },
    {
      label: 'Daily',
      value: 'daily',
    },
    {
      label: 'Weekly',
      value: 'weekly',
    },
    {
      label: 'Monthly',
      value: 'monthly',
    },
  ]

  export const postAs: RadioOption[] = [
    {
      label: 'Individual',
      value: 'individual',
    },
    {
      label: 'Company',
      value: 'company',
    },
  ]

  export const companySizes: SelectInputOption[] = [
    {
      label: 'Micro (less than 10 employees)',
      value: 'micro',
    },
    {
      label: 'Small (10-99 employees)',
      value: 'small',
    },
    {
      label: 'Medium (100-199 employees)',
      value: 'medium',
    },
    {
      label: 'Large (200 or more employees)',
      value: 'large',
    },
  ]
}
