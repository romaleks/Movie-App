import { FC } from 'react'

import Menu from '../Menu'

import { useGenres } from './useGenres'

const GenreMenu: FC = () => {
  const { data, isLoading } = useGenres()

  return isLoading ? (
    <div className="mx-11 mb-6">Loading...</div>
  ) : (
    <Menu menu={{ title: 'Popular genres', items: data || [] }} />
  )
}

export default GenreMenu
