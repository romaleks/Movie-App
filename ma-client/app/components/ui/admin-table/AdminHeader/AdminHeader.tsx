import { ChangeEvent, FC } from 'react'

import SearchField from '@/ui/search-field/SearchField'

import Button from '../../form-elements/Button'

import styles from './AdminHeader.module.scss'

interface IAdminHeader {
  onClick?: () => void
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  handleSearch,
  searchTerm,
}) => {
  return (
    <div className={styles.header}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      {onClick && <Button onClick={onClick}>Create new</Button>}
    </div>
  )
}

export default AdminHeader
