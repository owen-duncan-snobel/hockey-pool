import { IPlayoff } from '@backend/types/playoffs'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface BracketsResponse {
  message: string
  status: number
  data: {
    brackets: IPlayoff
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useBrackets () {
  const { data, error, isLoading } = useSWR<BracketsResponse>(`${API_URL}/NHLBrackets`, fetcher)
  
  return {
    brackets: data?.data.brackets,
    isLoading,
    error: error
  }
}