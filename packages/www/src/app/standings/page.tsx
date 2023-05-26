"use client"
import MainMenu from '@/components/menu'
import { useActiveSeries } from '@/hooks/hooks'

export default function Standings() {
  const { series, error, isLoading } = useActiveSeries()

  if (error) return <p>There is an error.</p>
  if (isLoading) return <div>Loading...</div>
  if (!series) return <div></div>

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
        <StandingsTable />
      </div>
    </div>
  )
}

function StandingsTable(){
  return (
    <div className="overflow-x-auto rounded-md border shadow-lg">
      <table className="min-w-full divide-y-2 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Rank
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Points
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900"></td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900"></td>
          </tr>

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