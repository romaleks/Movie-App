import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isSuccess } = useQuery(
    ['search movie list', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return { data, isSuccess, searchTerm, handleSearch }
}
