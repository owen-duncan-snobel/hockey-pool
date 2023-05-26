"use client"
import MainMenu from '@/components/menu'
import { Response } from '@/hooks/hooks'
import { useAuth } from '@clerk/nextjs'
import { API_URL } from '@/constants'
import { IPlayoffUserStanding } from '@backend/types/playoffs'
import useSWR from 'swr'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

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
      <div>
      {/* {standings && standings.length > 0 && (
          <div className='flex flex-col justify-center items-center'>
            {standings.map((user, index) => {
              return (
                <div>
                  {user.username}
                  {user.picks.map((pick, index) => <div>
                    {pick.pick.team?.teamName}
                  </div>)}
                </div>
              )
            })}
          </div>
        )} */}
      </div>
    </div>
  )
}


function StandingsTable({standings}: {standings: IPlayoffUserStanding[]}){
  let [openDialog, setOpenDialog] = useState({
    isOpen: false,
    standingsIndex: 0
  })

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
            standings && standings.length > 0 ? (standings.map((user, index) => {
              return (
                <tr key={user.id} className='relative' onClick={() => setOpenDialog((prev) => {
                  return {
                    ...prev,
                    isOpen: true,
                    standingsIndex: index
                  }
                })}>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-900 flex items-center">
                    <button className='bg-gray-900 text-white px-2 py-1 rounded-md flex items-center font-medium'>
                      {user.username}    
                      <ChevronRightIcon height={15} width={15} />
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-900">{user.points}</td>
                </tr>
              )
            })
          ) : (
            <StandingsTableSkeleton />
          )
          }
        </tbody>
      </table>
      <Dialog
        open={openDialog.isOpen}
        onClose={() => setOpenDialog((prev) => {
          return {
            ...prev,
            isOpen: false,
            standingsIndex: 0
          }
        })}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto w-5/6 px-10 rounded bg-white">
              <Dialog.Title>
                {standings && standings.length > 0 && standings[openDialog.standingsIndex].picks.map((pick, index) => {
                  return (
                    <div>
                      {pick.pick.team?.teamName}
                    </div>
                  )
                })}
              </Dialog.Title>

              {/* ... */}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

function StandingsTableSkeleton(){
  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-10 py-2 font-medium text-gray-900"></td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">&nbsp;</td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">{""}</td>
      </tr>
      <tr>
        <td className="whitespace-nowrap px-10 py-2 font-medium text-gray-900"></td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">&nbsp;</td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">{""}</td>
      </tr>
      <tr>
        <td className="whitespace-nowrap px-10 py-2 font-medium text-gray-900"></td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">{"NO PICKS"}</td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">{""}</td>
      </tr>
      <tr>
        <td className="whitespace-nowrap px-10 py-2 font-medium text-gray-900"></td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">&nbsp;</td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">{""}</td>
      </tr>
      <tr>
        <td className="whitespace-nowrap px-10 py-2 font-medium text-gray-900"></td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">&nbsp;</td>
        <td className="whitespace-nowrap px-10 py-2 text-gray-900">{""}</td>
      </tr>
    </>
  )
}