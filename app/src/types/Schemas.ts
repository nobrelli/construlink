import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import type { Role } from './Enums'

export interface ErrorResponse {
  message?: string
}

type HasKey = { key: string }

export interface UserSchema extends HasKey {
  firstName: string
  lastName: string
  address: string
  role: Role
  expertise: string[]
  location: string
}

export interface TradespersonSchema extends UserSchema {
  expertise: string[]
}

export interface JobSchema extends HasKey {
  authorId: string
  createdAt: FirebaseFirestoreTypes.Timestamp
  title: string
  category: string
  description: string
  location: string
  employmentType: string
  deadline?: FirebaseFirestoreTypes.Timestamp
  payAmount?: number
  payAmountMin?: number
  payAmountMax?: number
  rate?: string
  isUsingRange: boolean
  postAs: string
  status: string
}

export interface CompanySchema extends HasKey {
  name: string
  description: string
  size: string
  location: string
}

export interface InvitationSchema extends HasKey {
  authorId: string
  recipientId: string
  jobId: string
  status: string
}
