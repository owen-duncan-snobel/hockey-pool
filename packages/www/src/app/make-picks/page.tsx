"use client"
import MainMenu from '@/components/menu'
import { useActiveSeries } from '@/hooks/hooks'
import useSWR from 'swr'
import { useAuth } from '@clerk/nextjs'
import { API_URL } from '@/constants'
import { Response } from '@/hooks/hooks'
import { PrismaNhlBracketPick, PrismaNhlTeamInSeries } from '@backend/types/playoffs'
import React, { useState } from 'react'
import Error from 'next/error'
import { format } from 'date-fns'
import { SeriesGroup } from '@/components/picks'
 
function useUserPicks(url: string) {
  const { getToken } = useAuth();
  const fetcher = async (...args: [RequestInfo]) => {
    return fetch(...args, {
      headers: { Authorization: `Bearer ${await getToken()}` }
    }).then(res => res.json());
  };
  const { data, error, isLoading } = useSWR<Response<{
    picks: (PrismaNhlBracketPick & {
        pick: PrismaNhlTeamInSeries,
        user: {
          id: number;
          username: string | null;
        }
    })[]
  }>>(url, fetcher)

  return {
    picks: data?.data.picks,
    error,
    isLoading
  }
}

export default function MakePicks() {
  const { series, seriesStarted, error: seriesError, isLoading: seriesIsLoading } = useActiveSeries()
  const { picks, error: picksError, isLoading: picksLoading } = useUserPicks(`${API_URL}/NHLPicks`)

  if (seriesError) return <Error statusCode={500} title='There is an error.' />
  if (seriesIsLoading) return <div>Loading...</div>
  if (!series) return <div></div>

  if (picksError) return <Error statusCode={500} title='There is an error.' />
  if (picksLoading) return <div>Loading...</div>
  if (!picks) return <div></div>

  const seriesStartTime = series[0].gameTime as unknown as string
  
  return (
    <div>
      <div className='sticky top-2 float-right px-2 z-10'>
        <MainMenu />
      </div>

      <div>
        <div className='flex flex-col gap-y-1 w-full px-10'>
          <h1 className='text-4xl font-medium uppercase text-center'>
            Picks
          </h1> 
          <h1 className='text-2xl font-medium uppercase text-center underline underline-offset-4'>
            Round {series[0].round}
          </h1>

          <div className='flex w-full justify-center mt-4'>
            <div className='rounded-full w-[350px]'>
              {!seriesStarted ? (
                <div className='flex justify-center items-center flex-col'>
                  <h1 className='text-md font-medium uppercase text-center'>
                    PICKS DUE: {format(new Date(seriesStartTime), 'MMMM do, yyyy h:mm a')}
                  </h1>

                  <h1 className='my-2'>
                    SELECT YOUR PICKS*
                  </h1>
                </div>
              ) : (
                <div className='flex justify-center items-center flex-col'>
                  <h1 className='text-md font-medium uppercase text-center'>
                    PICKS DUE: {' '}
                    <span className='font-bold'>SERIES HAS BEGUN</span>
                  </h1>
                </div>
              )
            }
            </div>
          </div>

      </div>
        <div className='h-10' />
          <div className='flex justify-center h-5/6 md:h:3/4'>   
            <div className=''>
              <SeriesGroup series={series} seriesStarted={seriesStarted!}  />
          </div>  
        </div>
      </div>
    </div>
  )
}
