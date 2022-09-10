import QueryString from 'query-string'

export enum REQUEST_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export default class BaseService {
  static async fetchData<T extends object, K>(method: string, apiURL: string, query?: T, body?: T): Promise<K> {
    return new Promise((resolve, reject) => {
      let url = process.env.NEXT_PUBLIC_API_ENDPOINT + apiURL
      if (method === REQUEST_METHOD.GET && query) {
        url += '?' + QueryString.stringify(query)
      }
      let opt: RequestInit = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      if (body) {
        opt.body = JSON.stringify(body)
      }
      fetch(url, opt)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        reject(new Error('Something went wrong'))
      })
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
    })
  } 
}