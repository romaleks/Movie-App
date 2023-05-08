import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IActor, IMovie } from '@/shared/types/movie.types'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

interface IActorPage {
  movies: IMovie[]
  actor: IActor | undefined
}

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
  return actor ? (
    <Catalog movies={movies || []} title={actor.name} />
  ) : (
    <Error404 />
  )
}

export const getStaticProps: GetStaticProps<IActorPage> = async ({
  params,
}) => {
  try {
    const { data: actor } = await ActorService.getBySlug(String(params?.slug))

    const { data: movies } = await MovieService.getByActor(actor._id)

    return {
      props: {
        actor,
        movies,
      },
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
    const { data: actors } = await ActorService.getAll()
    const paths = actors.map(actor => ({
      params: {
        slug: actor.slug,
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

export default ActorPage
