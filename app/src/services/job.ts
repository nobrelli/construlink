import type { ErrorResponse, JobSchema } from '@/types/Schemas'
import firestore from '@react-native-firebase/firestore'

export class JobService {
  private static _instance: JobService
  private static _userId: string

  private constructor() {}

  public static getInstance(userId?: string) {
    if (!JobService._instance) {
      JobService._instance = new JobService()

      if (userId) {
        JobService._userId = userId
      }
    }

    return JobService._instance
  }

  public static async getJobs(): Promise<JobSchema[] | null> {
    try {
      const entries: JobSchema[] = []
      const result = await firestore()
        .collection<JobSchema>('jobs')
        .where('authorId', '==', JobService._userId)
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
      return null
    }
  }
}
