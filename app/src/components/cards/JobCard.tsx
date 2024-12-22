import { Cl } from '@/lib/options'
import { getCompanyDetails } from '@/services/company'
import typography from '@/theme/typography'
import { IconSet } from '@/types/Icons'
import type { JobSchema } from '@/types/Schemas'
import { useMount } from '@reactuses/core'
import { formatDistanceToNowStrict } from 'date-fns'
import { router, useFocusEffect } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ClCard } from '../ClCard'
import { ClIconText } from '../ClIconText'
import { ClText } from '../ClText'

interface JobCardProps
  extends Pick<
    JobSchema,
    'authorId' | 'title' | 'location' | 'postAs' | 'employmentType'
  > {
  jobId: string
  postTime: Date
}

export function JobCard(props: JobCardProps) {
  const { jobId, title, location, postAs, postTime, employmentType } = props

  const handleViewJobPost = () => {
    router.navigate({
      pathname: '/job/[jobId]',
      params: {
        jobId,
      },
    })
  }

  return (
    <ClCard onPress={handleViewJobPost}>
      <View>
        <ClText
          weight="bold"
          style={{ fontSize: typography.presets.lg.fontSize }}
        >
          {title}
        </ClText>
        <JobAuthor authorId={props.authorId} postAs={postAs} />
      </View>
      <View>
        <ClIconText
          icon={{
            set: IconSet.MaterialCommunityIcons,
            name: 'map-marker',
          }}
          text={location}
          style={{ fontSize: typography.presets.sm.fontSize }}
        />
        <ClIconText
          icon={{
            set: IconSet.MaterialCommunityIcons,
            name: 'briefcase',
          }}
          text={
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            Cl.employmentTypes.find((option) => option.value === employmentType)
              ?.label!
          }
          style={{ fontSize: typography.presets.sm.fontSize }}
        />
      </View>
      <JobPostedAgo timestamp={postTime} />
    </ClCard>
  )
}

function JobAuthor({ authorId, postAs }: { authorId: string; postAs: string }) {
  const [authorName, setAuthorName] = useState('...')

  useMount(() => {
    if (postAs === 'company') {
      getCompanyDetails(authorId).then((company) => {
        if (company) setAuthorName(company.name)
      })
    } else {
      setAuthorName('Invididual Employer')
    }
  })

  return (
    <ClText style={{ fontSize: typography.presets.base.fontSize }}>
      {authorName}
    </ClText>
  )
}

function JobPostedAgo({ timestamp }: { timestamp: Date }) {
  const [distance, setDistance] = useState('')

  const computeDistance = () => {
    return formatDistanceToNowStrict(timestamp, {
      addSuffix: true,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    setDistance(computeDistance())

    const timeout = setInterval(() => {
      setDistance(computeDistance())
    }, 30000)

    return () => clearInterval(timeout)
  }, [])

  // Update on focus
  useFocusEffect(() => {
    setDistance(computeDistance())
  })

  return (
    <ClText
      style={{ fontSize: typography.presets.xs.fontSize }}
      type="helper"
      dim
    >
      {distance ? `Posted ${distance}` : 'Just now'}
    </ClText>
  )
}
