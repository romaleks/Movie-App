import { errorCatch } from 'api/api.helpers'
import { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

import { getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ slides }) => {
  return (
    <div>
      <Home slides={slides} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAll()

    const slides: ISlide[] = movies.slice(0, 3).map(m => ({
      _id: m._id,
      link: getMovieUrl(m.slug),
      subTitle: getGenresList(m.genres),
      title: m.title,
      bigPoster: m.bigPoster,
    }))

    return {
      props: {
        slides,
      } as IHome,
    }
  } catch (error) {
    console.log(errorCatch(error))

    return {
      props: {
        slides: [],
      } as IHome,
    }
  }
}

export default HomePage
