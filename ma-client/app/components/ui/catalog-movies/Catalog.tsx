import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import { getMovieUrl } from '@/config/url.config'

import GalleryItem from '../gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'

import { ICatalog } from './Catalog.interface'
import styles from './Catalog.module.scss'

const Catalog: FC<ICatalog> = ({ title, description, movies }) => {
  return (
    <Meta title={title} description={description}>
      <Heading title={title} className={styles.heading} />

      {description && <Description text={description}></Description>}

      <section className={styles.movies}>
        {movies.map(movie => (
          <GalleryItem
            key={movie._id}
            item={{
              name: movie.title,
              link: getMovieUrl(movie.slug),
              posterPath: movie.bigPoster,
              content: {
                title: movie.title,
              },
            }}
            variant="horizontal"
          />
        ))}
      </section>
    </Meta>
  )
}

export default Catalog
