"use client"
import MainMenu from '@/components/menu'
import { Response } from '@/hooks/hooks'
import { useAuth } from '@clerk/nextjs'
import { API_URL } from '@/constants'
import { IPlayoffUserStanding } from '@backend/types/playoffs'
import useSWR from 'swr'

function useUserStandings(url: string) {
  const { getToken } = useAuth();
  const fetcher = async (...args: [RequestInfo]) => {
    return fetch(...args, {
      headers: { Authorization: `Bearer ${await getToken()}` }
    }).then(res => res.json());
  };
  const { data, error, isLoading } = useSWR<Response<{
    standings: IPlayoffUserStanding[]
  }>>(url, fetcher)

  return {
    standings: data ? data.data.standings : undefined,
    error,
    isLoading
  }
}

export default function Standings() {
  const { standings, error, isLoading } = useUserStandings(`${API_URL}/NHLStandings`)

  if (error) return <p>There is an error.</p>
  if (isLoading) return <div>Loading...</div>
  if (!standings) return <div></div>

  return (
    <div>
      <div className='sticky top-2 float-right px-2 z-10'>
        <MainMenu />
      </div>

      <div>
        <div className='flex w-full justify-center px-10'>
          <h1 className='text-4xl font-medium uppercase text-center'>
            Standings
          </h1> 
        </div>
      </div>

      <div className='flex justify-center w-full px-5 mt-10'>
        <StandingsTable standings={standings} />
      </div>
    </div>
  )
}

function StandingsTable({standings}: {standings: IPlayoffUserStanding[]}){
  return (
    <div className="overflow-x-auto rounded-md border shadow-lg">
      <table className="min-w-full divide-y-2 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Rank
            </th>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Points
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">

          {
            standings && (standings.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-900">{user.username}</td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-900">{user.points}</td>
                </tr>
              )
            })
          )}
          {/* <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900"></td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900"></td>
          </tr> */}

          {/* <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              2
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900">04/11/1980</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900">Web Designer</td>
          </tr>

          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              3
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900">24/05/1995</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900">Singer</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}