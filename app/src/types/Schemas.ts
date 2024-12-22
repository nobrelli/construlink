import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import type { Role } from './Enums'

export interface ErrorResponse {
  message?: string
}

type HasKey = { key: string }

export interface UserSchema extends HasKey {
  firstName: string
  lastName: string
  role: Role
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
  hoursType?: string
  start?: FirebaseFirestoreTypes.Timestamp
  end?: FirebaseFirestoreTypes.Timestamp
  payType?: string
  payAmount?: number
  postAs: string
}

export interface CompanySchema extends HasKey {
  name: string
  description: string
  size: string
  location: string
}
