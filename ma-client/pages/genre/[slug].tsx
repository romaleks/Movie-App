import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IGenre, IMovie } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

interface IGenrePage {
  movies: IMovie[]
  genre: IGenre | undefined
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
  return genre ? (
    <Catalog
      movies={movies || []}
      title={genre.name}
      description={genre.description}
    />
  ) : (
    <Error404 />
  )
}

export const getStaticProps: GetStaticProps<IGenrePage> = async ({
  params,
}) => {
  try {
    const { data: genre } = await GenreService.getBySlug(String(params?.slug))

    const { data: movies } = await MovieService.getByGenres([genre._id])

    return {
      props: {
        genre,
        movies,
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
    const { data: genres } = await GenreService.getAll()
    const paths = genres.map(genre => ({
      params: {
        slug: genre.slug,
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

export default GenrePage
