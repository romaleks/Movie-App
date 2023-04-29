import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { ActorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'

export const useAdminActors = () => {
  const queryData = useQuery(['List of actors'], () => ActorService.getAll(), {
    select: ({ data }) =>
      data.map(
        (actor): IOption => ({
          label: actor.name,
          value: actor._id,
        })
      ),
    onError: error => {
      toastError(error, 'Actor list')
    },
  })

  return queryData
}
