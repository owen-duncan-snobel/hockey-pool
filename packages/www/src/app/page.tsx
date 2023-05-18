"use client"
import { useFetch } from 'usehooks-ts'
import NHLBrackets from '@/libs/react-flow/flow'
import { useBrackets } from '@/hooks/hooks'



export default function Home() {
  const { brackets, error, isLoading } = useBrackets()

  if (error) return <p>There is an error.</p>
  if (isLoading) return <div>Loading...</div>
  if (!brackets) return <div></div>

  return (
    <div className='h-screen'>
      <div className=''>
        <h1 className='text-4xl font-medium uppercase text-center'>
          2023
        </h1>
        <h1 className='text-3xl font-normal text-center'>
          Doherty & Ralph Hockey Pool
        </h1>
      </div>

      <div className='md:h-20' />

      <div className='h-5/6 md:h:3/4'>     
        <NHLBrackets data={brackets} />
       </div>

      {/* <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='bg-red-200'>works</div>
        <div className='bg-red-200'>works</div>
        <div className='bg-red-200'>works</div>
      </div>  */}
    </div>
  )
}