import type { Role } from './Enums'

export interface CreateJobFields {
  jobTitle: string
}

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
