import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

export const useAdminGenres = () => {
  const queryData = useQuery(['List of genres'], () => GenreService.getAll(), {
    select: ({ data }) =>
      data.map(
        (genre): IOption => ({
          label: genre.name,
          value: genre._id,
        })
      ),
    onError: error => {
      toastError(error, 'Actor list')
    },
  })

  return queryData
}
