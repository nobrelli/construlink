import { stripNullish } from '@/helpers/utils'
import type { CreateJobFields } from '@/types/Fields'
import type { JobSchema } from '@/types/Schemas'
import firestore, { serverTimestamp } from '@react-native-firebase/firestore'
import { v7 as uuidv7 } from 'uuid'

export async function createJob(
  employerId: string,
  fields: CreateJobFields,
  companyId?: string
) {
  const newFields = Object.assign(fields, companyId && { companyId })

  try {
    await firestore()
      .collection('jobs')
      .doc(uuidv7())
      .set({
        ...stripNullish(newFields),
        createdAt: serverTimestamp(),
        authorId: employerId,
        status: 'pending',
      })

    return true
  } catch (error: unknown) {
    return false
  }
}

export async function getMyJobPosts(employerId: string) {
  const entries: JobSchema[] = []

  try {
    const result = await firestore()
      .collection<JobSchema>('jobs')
      .where('authorId', '==', employerId)
      .orderBy('createdAt', 'desc')
      .get()

    if (result.empty) return null

    // biome-ignore lint/complexity/noForEach:
    result.forEach((documentSnapshot) => {
      entries.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      })
    })

    return entries
  } catch (error: unknown) {
    console.error(error)
    return null
  }
}

export async function getAllJobPosts() {
  const entries: JobSchema[] = []

  try {
    const result = await firestore()
      .collection<JobSchema>('jobs')
      .orderBy('createdAt', 'desc')
      .get()

    if (result.empty) return null

    // biome-ignore lint/complexity/noForEach:
    result.forEach((documentSnapshot) => {
      entries.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      })
    })

    return entries
  } catch (error: unknown) {
    console.error(error)
    return null
  }
}

export async function getJobPost(jobId: string) {
  try {
    const result = await firestore()
      .collection<JobSchema>('jobs')
      .doc(jobId)
      .get()

    if (!result.exists) return null

    return result.data() as JobSchema
  } catch (error: unknown) {
    console.error(error)
    return null
  }
}
