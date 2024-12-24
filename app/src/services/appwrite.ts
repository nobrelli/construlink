import { Client, Storage } from 'react-native-appwrite'

export const appwriteClient = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API_URL)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM)

export const appwriteStorage = new Storage(appwriteClient)

export interface AppwriteFile {
  name: string
  type: string
  size: number
  uri: string
}

export interface Size {
  width: number
  height: number
}
