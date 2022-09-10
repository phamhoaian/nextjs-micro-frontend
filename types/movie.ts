export interface Movie {
  videoId: string
  url: string
  title: string
  description: string
  createAt: string
  _id: string
}

export interface MovieList {
  limit: number,
  offset: number,
  movies: Array<Movie>
  totalItems: number
}