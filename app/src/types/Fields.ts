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

export interface CreateJobFields {
  title: string
  category: string
  employmentType: string
  location: string
  summary: string
  description: string
  postAs: string
  deadline: string
  startDate: string
  endDate: string
  pay: string
  payPeriod: string
  isPayRange: string
}
