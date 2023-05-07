import { errorCatch } from 'api/api.helpers'
import { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

import { getActorUrl, getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ ...props }) => {
  return <Home {...props} />
}

export const getStaticProps: GetStaticProps<IHome> = async () => {
  try {
    const { data: movies } = await MovieService.getAll()
    const { data: dataActors } = await ActorService.getAll()
    const dataTrendingMovies = await MovieService.getMostPopularMovies()

    const slides: ISlide[] = movies.slice(0, 3).map(m => ({
      _id: m._id,
      link: getMovieUrl(m.slug),
      subTitle: getGenresList(m.genres),
      title: m.title,
      bigPoster: m.bigPoster,
    }))

    const actors: IGalleryItem[] = dataActors.slice(0, 7).map(a => ({
      name: a.name,
      posterPath: a.photo,
      link: getActorUrl(a.slug),
      content: {
        title: a.name,
        subtitle: `+${a.countMovies} movies`,
      },
    }))

    const trendingMovies: IGalleryItem[] = dataTrendingMovies
      .slice(0, 7)
      .map(m => ({
        name: m.title,
        posterPath: m.poster,
        link: getMovieUrl(m.slug),
      }))

    return {
      props: {
        slides,
        actors,
        trendingMovies,
      },
    }
  } catch (error) {
    console.log(errorCatch(error))

    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: [],
      },
    }
  }
}

export default HomePage
