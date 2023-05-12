import dynamic from 'next/dynamic'
import { FC } from 'react'

import PopularMovies from './PopularMovies'

const DynamicFavoriteMovies = dynamic(
  () => import('./FavouriteMovies/FavoriteMovies'),
  {
    ssr: false,
  }
)

const MoviesContainer: FC = () => {
  return (
    <div>
      <PopularMovies />
      <DynamicFavoriteMovies />
    </div>
  )
}

export default MoviesContainer
