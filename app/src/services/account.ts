import type { ReactNativeFirebase } from '@react-native-firebase/app'
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth'

interface ErrorMessage {
  errorMessage?: string
}

interface EmailSignInReturnType extends ErrorMessage {
  userCredential?: FirebaseAuthTypes.UserCredential
}

export class AccountService {
  private static _instance: AccountService

  private constructor() {}

  public static getInstance() {
    if (!AccountService._instance) {
      AccountService._instance = new AccountService()
    }

    return AccountService._instance
  }

  public static async emailSignIn(
    email: string,
    password: string
  ): Promise<EmailSignInReturnType> {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password)

      return {
        userCredential: result,
      }
    } catch (error: unknown) {
      const fbError = error as ReactNativeFirebase.NativeFirebaseError

      if (fbError.code === 'auth/invalid-credential') {
        return { errorMessage: 'The supplied credentials are incorrect.' }
      }

      return { errorMessage: 'Unable to sign in due to unstable network.' }
    }
  }
}
