import type { Role } from './Enums'

export interface SignInFields {
  email: string
  phone: string
  password: string
}

export type ForgotPasswordFields = Omit<SignInFields, 'password'>

export type CodeField = { code: string }

export interface ChangePasswordFields {
  newPassword: string
  confirmPassword: string
}

export interface SignUpFields extends SignInFields {
  role: Role
  firstName: string
  lastName: string
}

export interface TimeRangeFields {
  start: Date
  end: Date
}

export interface CreateJobFields {
  title: string
  category: string
  employmentType: string
  location: string
  description: string
  postAs: string
  deadline: Date
  payAmount: number
  payAmountMin: number
  payAmountMax: number
  rate: string
  isUsingRange: boolean
}

export interface CreateCompanyFields {
  name: string
  description: string
  size: string
  location: string
}
