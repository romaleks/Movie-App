import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { MovieService } from '@/services/movie.service'

export const useUpdateCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation(['update count opened'], () =>
    MovieService.updateCountOpened(slug)
  )

  useEffect(() => {
    mutateAsync()
  }, [])
}
