import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import SkeletonLoader from '../../SkeletonLoader'
import { IUploadField } from '../form.interface'
import styles from '../form.module.scss'

import { useUpload } from './useUpload'

const UploadField: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  value,
  folder,
  onChange,
  isNotImage = false,
}) => {
  const { uploadFile, isLoading } = useUpload(onChange, folder)

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadFlex}>
        <label>
          <span>{placeholder}</span>
          <input type="file" onChange={uploadFile} />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>
        {!isNotImage && (
          <div className={styles.uploadImageContainer}>
            {isLoading ? (
              <SkeletonLoader count={1} className="w-full h-full" />
            ) : (
              value && <Image src={value} alt="" layout="fill" unoptimized />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadField
