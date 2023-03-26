import { FC } from 'react'

import FavouriteMovies from './FavouriteMovies/FavouriteMovies'
import PopularMovies from './PopularMovies'

const MoviesContainer: FC = () => {
  return (
    <>
      <PopularMovies />
      <FavouriteMovies />
    </>
  )
}

export default MoviesContainer
