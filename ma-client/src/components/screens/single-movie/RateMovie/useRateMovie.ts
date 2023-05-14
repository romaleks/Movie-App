import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating.service'

import { toastError } from '@/utils/toast-error'

export const useRateMovie = (movieId: string) => {
  const [rating, setRating] = useState(0)
  const [isSent, setIsSent] = useState(false)

  const { user } = useAuth()

  const { refetch } = useQuery(
    ['your movie rating', movieId],
    () => RatingService.getByUserMovie(movieId),
    {
      onSuccess: ({ data }) => {
        setRating(data)
      },
      onError: error => {
        toastError(error, 'Get rating')
      },
      enabled: !!movieId && !!user,
    }
  )

  const { mutateAsync } = useMutation(
    ['set rating movie'],
    ({ value }: { value: number }) => RatingService.setRating(movieId, value),
    {
      onSuccess: () => {
        setIsSent(true)
        refetch()

        setTimeout(() => {
          setIsSent(false)
        }, 2400)
      },
      onError: error => {
        toastError(error, 'Rate movie')
      },
    }
  )

  const handleClick = async (nextValue: number) => {
    setRating(nextValue)
    await mutateAsync({ value: nextValue })
  }

  return { isSent, rating, handleClick }
}
