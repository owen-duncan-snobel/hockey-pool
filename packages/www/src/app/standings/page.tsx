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
import Image from 'next/image'
import { StandingsTable } from '@/components/standings'

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