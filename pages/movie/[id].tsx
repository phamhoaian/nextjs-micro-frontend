import { NextRouter, useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useQuery } from 'react-query'
import MovieService from '../../services/movieService'
import MovieItem from '../../components/MovieItem'
import styles from './MovieDetail.module.scss'

const MovieDetail: NextPage = () => {
  const router: NextRouter = useRouter()
  const { id } = router.query
  const movieId = id as string
  const { data: movie, isLoading } = useQuery(
    ['movie', movieId],
    () => MovieService.getMovieById(movieId),
    {
      enabled: !!id
    }
  )
  return (
    <div className={styles.container}>
      {isLoading ? (
        <p className={styles.center}>Loading...</p>
      ) : (
        <>
          <Link href="/">Back</Link>
          {movie && <MovieItem item={movie} />}
        </>
      )}
    </div>
  )
}

export default MovieDetail