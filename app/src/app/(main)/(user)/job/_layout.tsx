import { ClIcon } from '@/components/ClIcon'
import { type ClMenuHandleProps, ClPopupMenu } from '@/components/ClPopupMenu'
import { ClStack } from '@/components/navigation/ClStack'
import { createStyles } from '@/helpers/createStyles'
import { resolveColor } from '@/helpers/resolveColor'
import { useRenderCount } from '@/hooks/useRenderCount'
import { IconSet } from '@/types/Icons'
import { Stack, router } from 'expo-router'
import React, { useRef } from 'react'
import { Share, TouchableOpacity } from 'react-native'

export default function UserLayout() {
  useRenderCount('UserLayout')

  const styles = useStyles()
  const popupMenuRef = useRef<ClMenuHandleProps>(null)

  const handleShare = () => {
    Share.share({
      message: 'Check out this job post!',
      url: 'https://example.com/job/123',
      title: 'Job Post',
    })
  }

  return (
    <>
      <ClStack>
        <Stack.Screen name="select" options={{ title: 'Select Job' }} />
        <Stack.Screen name="create" options={{ title: 'Post a Job' }} />
        <Stack.Screen
          name="description-editor"
          options={{
            title: 'Edit',
            presentation: 'modal',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="preview"
          options={{
            title: 'Preview',
            presentation: 'modal',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen name="submitted" options={{ title: '' }} />
        <Stack.Screen
          name="[jobId]"
          options={{
            title: '',
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => popupMenuRef.current?.show()}>
                <ClIcon
                  set={IconSet.MaterialCommunityIcons}
                  name="dots-vertical"
                  color={styles.icon.color}
                  size={styles.icon.fontSize}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </ClStack>
      <ClPopupMenu
        ref={popupMenuRef}
        items={[
          {
            title: 'Edit post',
            onPress: () => router.navigate('/(main)/(user)/job/create'),
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'briefcase-edit',
            },
          },
          {
            title: 'Share post',
            onPress: handleShare,
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'share-variant',
            },
          },
          {
            title: 'Close job post',
            onPress: () => router.navigate('/(main)/(user)/job/create'),
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'progress-close',
            },
          },
          {
            title: 'Delete',
            onPress: () => router.navigate('/(main)/(user)/job/create'),
            icon: {
              set: IconSet.MaterialCommunityIcons,
              name: 'delete',
            },
          },
        ]}
      />
    </>
  )
}

const useStyles = createStyles(({ colors, sizes, spacing }) => ({
  headerRightContainer: {
    paddingRight: spacing[4],
    paddingTop: spacing[2],
  },
  icon: {
    color: resolveColor(colors.accent.base, colors.brand.base),
    fontSize: sizes.icon.md,
  },
}))
