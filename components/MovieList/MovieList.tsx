import React from "react"
import { useInfiniteQuery } from 'react-query'
import MovieService from '../../services/movieService'
import MovieItem from '../MovieItem'
import styles from '../../styles/Home.module.scss'

const MovieList: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['movies'],
    MovieService.getAllMovies,
    {
      getNextPageParam: (lastPage, pages) => lastPage.offset <= lastPage.totalItems ? lastPage.offset + 3 : undefined
    }
  )
  return (
    <>
      {isLoading ? (
          <p className={styles.center}>Loading...</p>
        ) : (
          data?.pages ? (
            <>
              {data?.pages.map(page => {
                return page.movies.map(movie => (
                  <MovieItem item={movie} key={movie._id} />
                ))
              })}
              {hasNextPage && <div className={styles.center}>
                <button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >Load more</button>
              </div>}
            </>
          ) : (
            <p className={styles.center}>No video available</p>
          )
        )}
    </>
  )
}

export default MovieList