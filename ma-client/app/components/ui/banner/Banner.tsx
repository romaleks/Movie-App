import Image from 'next/image'
import { FC } from 'react'

import styles from './Banner.module.scss'

interface IBanner {
  image: string
  Detail?: FC | null
}

const Banner: FC<IBanner> = ({ image, Detail }) => {
  return (
    <div className={styles.banner}>
      <Image
        alt=""
        src={image}
        draggable={false}
        className="image-like-bg object-top"
        fill
        unoptimized
        priority
      />
      {Detail && <Detail />}
    </div>
  )
}

export default Banner
