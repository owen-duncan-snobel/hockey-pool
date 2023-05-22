import { IPlayoff, PrismaNhlSeries, PrismaNhlTeam } from '@backend/types/playoffs'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Response<T> {
  message: string
  status: number
  data: T
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useBrackets () {
  const { data, error, isLoading } = useSWR<Response<{brackets: IPlayoff}>>(`${API_URL}/NHLBrackets`, fetcher)
  
  return {
    brackets: data?.data.brackets,
    isLoading,
    error: error
  }
}

export function useActiveSeries () {
  const { data, error, isLoading } = useSWR<Response<{series: (PrismaNhlSeries & {
    teams: {
        team: PrismaNhlTeam | null;
    }[];
})[]}>>(`${API_URL}/NHLSeries/active`, fetcher)
  
  return {
    series: data?.data.series,
    isLoading,
    error: error
  }
}