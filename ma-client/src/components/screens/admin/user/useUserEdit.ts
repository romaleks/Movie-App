import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

import { IUserEditInput } from './user-edit.interface'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
  const { push, query } = useRouter()

  const userId = String(query.id)

  const { isLoading } = useQuery(
    ['user', userId],
    () => UserService.getById(userId),
    {
      onSuccess: ({ data }) => {
        setValue('email', data.email)
        setValue('isAdmin', data.isAdmin)
      },
      onError: error => {
        toastError(error, 'Get user')
      },
      enabled: !!query.id,
    }
  )

  const { mutateAsync } = useMutation(
    ['update user'],
    (data: IUserEditInput) => UserService.update(userId, data),
    {
      onSuccess: () => {
        toastr.success('Update user', 'update was successful')
        push(getAdminUrl('users'))
      },
      onError: error => {
        toastError(error, 'Get user')
      },
    }
  )

  const onSubmit: SubmitHandler<IUserEditInput> = async data => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
