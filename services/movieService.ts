import BaseService, { REQUEST_METHOD } from "./baseService"
import { Movie, MovieList } from "../types/movie"

export default class MovieService {
  static async getAllMovies({ pageParam = 0 }): Promise<MovieList> {
    const apiURL = '/movies'
    const query = {
      offset: pageParam, limit: 3
    }
    return BaseService.fetchData(REQUEST_METHOD.GET, apiURL, query)
  }

  static async getMovieById(id: string): Promise<Movie> {
    const apiURL = '/movie/' + id
    return BaseService.fetchData(REQUEST_METHOD.GET, apiURL)
  }
}