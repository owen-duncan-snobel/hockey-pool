"use client"
import { useFetch } from 'usehooks-ts'
import NHLBrackets from '@/libs/react-flow/flow'
import { useActiveSeries, useBrackets } from '@/hooks/hooks'
import Image from 'next/image'



export default function MakePicks() {
  const { series, error, isLoading } = useActiveSeries()

  if (error) return <p>There is an error.</p>
  if (isLoading) return <div>Loading...</div>
  if (!series) return <div></div>

  return (
    <div className='h-screen'>
      <div className=''>
        <h1 className='text-4xl font-medium uppercase text-center'>
          Round {series[0].round}
        </h1>
      </div>
      <div className='md:h-20' />
      <div className='flex justify-center h-5/6 md:h:3/4'>   
      <div className=''>
        {series.map((s, i) => {
            return (
              <div key={i}>
                <h1 className='text-3xl font-medium uppercase text-center'>
                  {s.seriesStatus}
                </h1>
                <h1 className='text-2xl font-normal text-center'>
                  {s.teams.map((t, i) => {
                    return (
                      <div className='flex gap-x-5 py-2' key={i}>
                        <Image src={t.team!.logo || ''} alt='' width={30} height={30} />
                        {t.team?.name}
                      </div>
                    )
                  })}
                </h1>
                <div className='md:h-20' />
              </div>
            )
          })
        }
        </div>  
       </div>

      {/* <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='bg-red-200'>works</div>
        <div className='bg-red-200'>works</div>
        <div className='bg-red-200'>works</div>
      </div>  */}
    </div>
  )
}