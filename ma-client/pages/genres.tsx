import { GetStaticProps, NextPage } from 'next'

import Collections from '@/components/screens/collections/Collections'
import { ICollection } from '@/components/screens/collections/collections.interface'

import { GenreService } from '@/services/genre.service'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
  collections,
}) => {
  return <Collections collections={collections} />
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: collections } = await GenreService.getCollections()

    return {
      props: {
        collections,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default GenresPage
