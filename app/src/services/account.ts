import type { Role } from '@/types/Enums'
import type { SignUpFields } from '@/types/Fields'
import type { ReactNativeFirebase } from '@react-native-firebase/app'
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface AccountServiceResponse {
  errorMessage?: string
  userCredential?: FirebaseAuthTypes.UserCredential
}

export class AccountService {
  private static _instance: AccountService

  private constructor() { }

  public static getInstance() {
    if (!AccountService._instance) {
      AccountService._instance = new AccountService()
    }

    return AccountService._instance
  }

  public static async emailSignIn(
    email: string,
    password: string
  ): Promise<AccountServiceResponse> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password)

      return { userCredential }
    } catch (error: unknown) {
      const fbError = error as ReactNativeFirebase.NativeFirebaseError

      if (fbError.code === 'auth/invalid-credential') {
        return { errorMessage: 'The supplied credentials are incorrect.' }
      }

      return { errorMessage: 'Unable to sign in due to unstable network.' }
    }
  }

  public static async getRole(userId: string): Promise<Role | null> {
    try {
      const result = await firestore().collection('roles').doc(userId).get()

      if (result.exists)
        return result.get('role') as Role

      return null
    } catch (error: unknown) {
      console.error(error)
      return null
    }
  }

  public static async phoneSignIn(phone: string) {
    try {
      const result = await auth().signInWithPhoneNumber(phone)
      return result
    } catch (error: unknown) {
      return { errorMessage: 'Invalid phone number.' }
    }
  }

  public static async signUp(data: SignUpFields): Promise<AccountServiceResponse> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password
      )

      try {
        await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set({
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
          })
      } catch (error: unknown) {
        return { errorMessage: 'Unable to process the request due to an error in the server.' }
      }

      return { userCredential }
    } catch (error: unknown) {
      const fbError = error as ReactNativeFirebase.NativeFirebaseError

      console.error(fbError)

      if (fbError.code === 'auth/email-already-in-use') {
        return { errorMessage: 'This email is already associated with an account.' }
      }

      return { errorMessage: 'Unable to send the request due to unstable network.' }
    }
  }

  public static async signOut() {
    try {
      await auth().signOut()
      return true
    } catch (error: unknown) {
      return false
    }
  }
}
