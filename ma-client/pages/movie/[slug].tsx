import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import Error404 from '../404'

export interface IMoviePage {
  movie: IMovie
  similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
  return movie ? (
    <SingleMovie movie={movie} similarMovies={similarMovies || []} />
  ) : (
    <Error404 />
  )
}

export const getStaticProps: GetStaticProps<IMoviePage> = async ({
  params,
}) => {
  try {
    const { data: movie } = await MovieService.getBySlug(String(params?.slug))

    const { data: dataSimilarMovies } = await MovieService.getByGenres(
      movie.genres.map(genre => genre._id)
    )

    const similarMovies: IGalleryItem[] = dataSimilarMovies
      .filter(m => m._id !== movie._id)
      .map(m => ({
        name: m.title,
        posterPath: m.poster,
        link: getMovieUrl(m.slug),
      }))

    return {
      props: {
        movie,
        similarMovies,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const { data: movies } = await MovieService.getAll()
    const paths = movies.map(movie => ({
      params: {
        slug: movie.slug,
      },
    }))

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export default MoviePage
