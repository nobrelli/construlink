import { getDp, removeDp, uploadDp } from '@/services/account'
import { useAuthStore } from '@/stores/auth'
import { useMount } from '@reactuses/core'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const MAX_DIM = 1024

async function resizeImage(uri: string) {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: MAX_DIM, height: MAX_DIM } }],
    {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  )

  return result.uri
}

async function processImage(
  result: ImagePicker.ImagePickerSuccessResult,
  id: string
) {
  const { fileName, fileSize, mimeType, uri, width, height } = result.assets[0]
  let manipFile: { uri: string; size: number } | null = null

  if (width > MAX_DIM || height > MAX_DIM) {
    const manipUri = await resizeImage(uri)
    const manipFileInfo = await FileSystem.getInfoAsync(manipUri)

    manipFile = {
      uri: manipUri,
      size: 0,
    }

    if (manipFileInfo.exists) {
      manipFile.size = manipFileInfo.size
    }
  }

  const uploadResult = await uploadDp(id, {
    // biome-ignore lint/style/noNonNullAssertion:
    name: fileName!,
    // biome-ignore lint/style/noNonNullAssertion:
    size: manipFile?.size ?? fileSize!,
    // biome-ignore lint/style/noNonNullAssertion:
    type: mimeType!,
    uri: manipFile?.uri ?? uri,
  })

  if (uploadResult) {
    await Image.clearDiskCache()
    await loadProfilePicture(id)

    return true
  }

  return false
}

async function loadProfilePicture(id: string) {
  return await getDp(id, {
    width: MAX_DIM,
    height: MAX_DIM,
  })
}

const sharedOptions: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  quality: 1,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  aspect: [1, 1],
  cameraType: ImagePicker.CameraType.front,
}

export function useDpUploader() {
  const user = useAuthStore((state) => state.user)
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleOpenImagePicker = async (shootMode: boolean) => {
    const result = shootMode
      ? await ImagePicker.launchCameraAsync(sharedOptions)
      : await ImagePicker.launchImageLibraryAsync(sharedOptions)

    if (!result.canceled && user) {
      setIsProcessing(true)
      setIsSuccess(false)

      const processResult = await processImage(result, user.uid)

      if (!processResult) {
        setIsError(true)
        return
      }

      setProfileUrl(result.assets[0].uri)
      setIsProcessing(false)
      setIsSuccess(true)
    }
  }

  const handleRemoveImage = async () => {
    setIsProcessing(true)
    setIsSuccess(false)

    if (user) {
      const result = await removeDp(user?.uid)

      if (!result) {
        setIsError(true)
        return
      }

      setProfileUrl(null)
    }

    setIsProcessing(false)
    setIsSuccess(true)
  }

  useMount(() => {
    if (user) {
      ;(async () => {
        const photoResource = await loadProfilePicture(user.uid)

        if (photoResource) {
          setProfileUrl(photoResource)
        }
      })()
    }
  })

  return {
    handleOpenImagePicker,
    handleRemoveImage,
    profileUrl,
    isProcessing,
    isSuccess,
    isError,
  }
}
