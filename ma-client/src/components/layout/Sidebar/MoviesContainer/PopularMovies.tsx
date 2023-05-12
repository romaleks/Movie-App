import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { MovieService } from '@/services/movie.service'

import MovieList from './MovieList'

const PopularMovies: FC = () => {
  const { data: popularMovies, isLoading } = useQuery(
    ['popular movies in sidebar'],
    () => MovieService.getMostPopularMovies()
  )

  return isLoading ? (
    <div className="mt-11">
      <SkeletonLoader count={3} className="h-28 mb-4" />
    </div>
  ) : (
    <MovieList
      link="/trending"
      title="Popular Movies"
      movies={popularMovies?.slice(0, 3) || []}
    />
  )
}

export default PopularMovies
