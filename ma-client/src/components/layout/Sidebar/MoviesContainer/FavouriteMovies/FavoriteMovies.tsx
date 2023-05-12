import { FC } from 'react'

import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MovieList'

import NotAuthFavorites from './NotAuthFavourites'

const FavouriteMovies: FC = () => {
  const { isLoading, favoriteMovies } = useFavorites()

  const { user } = useAuth()

  if (!user) return <NotAuthFavorites />

  return (
    <MovieList
      link="/favorites"
      movies={favoriteMovies?.slice(0, 3) || []}
      title="Favorites"
    />
  )
}

export default FavouriteMovies
