import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import UploadField from '@/components/ui/form-elements/uploadField/UploadField'
import Heading from '@/components/ui/heading/Heading'

import formStyles from '@/ui/form-elements/admin-form.module.scss'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IMovieEditInput } from '../movie/movie-edit.interface'
import { useMovieEdit } from '../movie/useMovieEdit'

import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false,
})

const MovieEdit: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IMovieEditInput>({
    mode: 'onChange',
  })

  const { onSubmit, isLoading } = useMovieEdit(setValue)

  const { isLoading: isGenresLoading, data: genres } = useAdminGenres()
  const { isLoading: isActorsLoading, data: actors } = useAdminActors()

  return (
    <Meta title="Edit movie">
      <AdminNavigation />
      <Heading title="Edit movie" />

      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('title', {
                  required: 'Title is required',
                })}
                placeholder="Title"
                error={errors.title}
              />

              <SlugField
                register={register}
                error={errors.slug}
                generate={() => {
                  setValue('slug', generateSlug(getValues('title')))
                }}
              />

              <Field
                {...register('parameters.country', {
                  required: 'Country is required',
                })}
                placeholder="Country"
                error={errors.parameters?.country}
                style={{ width: '31%' }}
              />

              <Field
                {...register('parameters.duration', {
                  required: 'Duration is required',
                })}
                placeholder="Duration (min.)"
                type="number"
                error={errors.parameters?.duration}
                style={{ width: '31%' }}
              />

              <Field
                {...register('parameters.year', {
                  required: 'Year is required',
                })}
                placeholder="Year"
                type="number"
                error={errors.parameters?.year}
                style={{ width: '31%' }}
              />

              <Controller
                control={control}
                name="genres"
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={genres || []}
                    isLoading={isGenresLoading}
                    placeholder="Genres"
                    error={error}
                    isMulti
                  />
                )}
                rules={{ required: 'Please select at least one genre!' }}
              />

              <Controller
                control={control}
                name="actors"
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={actors || []}
                    isLoading={isActorsLoading}
                    placeholder="Actors"
                    error={error}
                    isMulti
                  />
                )}
                rules={{ required: 'Please select at least one genre!' }}
              />

              <Controller
                control={control}
                name="poster"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder="movie"
                    placeholder="Poster"
                  />
                )}
                rules={{ required: 'Poster is required!' }}
              />

              <Controller
                control={control}
                name="bigPoster"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder="movie"
                    placeholder="Big poster"
                  />
                )}
                rules={{ required: 'Big poster is required!' }}
              />

              <Controller
                control={control}
                name="videoUrl"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder="movie"
                    placeholder="Video"
                    style={{ marginTop: -25 }}
                    isNotImage
                  />
                )}
                rules={{ required: 'Video is required!' }}
              />
            </div>

            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  )
}

export default MovieEdit
