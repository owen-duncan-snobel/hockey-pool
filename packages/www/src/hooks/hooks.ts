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
export function useBrackets () {
  const { data, error, isLoading } = useSWR<BracketsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/brackets`, fetcher)
  
  return {
    brackets: data?.data.brackets,
    isLoading,
    error: error
  }
}