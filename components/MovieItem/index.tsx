import React from 'react'
import Link from 'next/link'
import { Movie } from '../../types/movie'
import styles from './Movie.module.scss'

const MovieItem: React.FC<{ item: Movie }> = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.video}>
        <iframe
          width="320"
          height="200"
          src={`https://www.youtube.com/embed/${item.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link href={'/movie/' + item._id}>{item.title}</Link>
        </h3>
        <div className={styles.description}>
          Description:<br/>
          {item.description}
        </div>
      </div>
    </div>
  )
}

export default MovieItem