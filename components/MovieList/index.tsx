import React from "react"
import { QueryClient, QueryClientProvider } from 'react-query'
import MovieList from './MovieList'
const queryClient: QueryClient = new QueryClient()

const MovieListContainer: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieList />
    </QueryClientProvider>
  )
}

export default MovieListContainer