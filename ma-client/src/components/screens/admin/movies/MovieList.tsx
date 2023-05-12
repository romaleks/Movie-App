import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const UserList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useMovies()

  return (
    <Meta title="Movies">
      <AdminNavigation />
      <Heading title="Movies" />

      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Title', 'Genres', 'Rating']}
        tableItems={data || []}
      />
    </Meta>
  )
}

export default UserList
