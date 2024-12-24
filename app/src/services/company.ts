import type { CompanySchema } from '@/types/Schemas'
import firestore from '@react-native-firebase/firestore'

export async function getCompanyDetails(companyId: string) {
  try {
    const result = await firestore()
      .collection('companies')
      .doc(companyId)
      .get()

    if (!result.exists) return null

    return result.data() as CompanySchema
  } catch (error: unknown) {
    console.error(error)
    return null
  }
}
