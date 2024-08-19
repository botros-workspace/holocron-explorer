import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, options)
        setState({ data: response.data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: (error as Error).message,
        })
      }
    }

    fetchData()
  }, [url, options])

  return state
}

export default useFetch
