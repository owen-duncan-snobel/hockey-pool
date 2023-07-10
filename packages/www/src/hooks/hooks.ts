import { API_URL } from '@/constants'
import { IPlayoff, PrismaNhlBracketPick, PrismaNhlSeries, PrismaNhlTeam, PrismaNhlTeamInSeries } from '@backend/types/playoffs'
import { useAuth } from '@clerk/nextjs'
import useSWR from 'swr'

export interface Response<T> {
  message: string
  status: number
  data: T
}

const fetcher = (url: string) => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${null}` // WORKAROUND FOR NOW (CLERK MIDDLEWARE EXPECTS A AUTHORIZE HEADER EVEN IF NULL)
  }
}).then(r => r.json())


export function useBrackets () {
  const { data, error, isLoading } = useSWR<Response<{brackets: IPlayoff}>>(`/api/NHLBrackets`, fetcher)

  return {
    brackets: data?.data.brackets,
    isLoading,
    error: error
  }
}

export function useActiveSeries () {
  const { data, error, isLoading } = useSWR<Response<{
  series: (PrismaNhlSeries & {
    teams: {
        team: PrismaNhlTeam | null;
    }[],
  })[],
  seriesStarted: boolean
}>>(`${API_URL}/NHLSeries/active`, fetcher)

  return {
    series: data?.data.series,
    seriesStarted: data?.data.seriesStarted,
    isLoading,
    error: error
  }
}

export function useUserPicks() {
  const { data, error, isLoading } = useSWR<Response<{
    picks: (PrismaNhlBracketPick & {
        pick: PrismaNhlTeamInSeries,
        user: {
            id: number;
            username: string | null;
        }
    })[]
  }>>(`${API_URL}/NHLPicks`, fetcher)
  return {
    picks: data?.data.picks,
    isLoading,
    error: error
  }
}

// THIS IS USED INSIDE OF THE .tsx FILES
function useClerkSWR<T>(url: string) {
  const { getToken } = useAuth();
  const fetcher = async (...args: [RequestInfo]) => {
    return fetch(...args, {
      headers: { Authorization: `Bearer ${await getToken()}` }
    }).then(res => res.json());
  };

  const { data, error, isLoading } = useSWR<T>(url, fetcher)

  return {
    data,
    error,
    isLoading
  }
}
