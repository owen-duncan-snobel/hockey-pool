"use client"
import { useFetch } from 'usehooks-ts'
import { NHLBrackets } from '@/libs/react-flow/custom-nodes'
import { IPlayoff } from '@backend/types/playoffs'

const url = `${process.env.NEXT_PUBLIC_API_URL}/brackets`  

interface BracketsResponse {
  message: string
  status: number
  data: {
    brackets: IPlayoff
  }
}

export default function Home() {
  const { data, error } = useFetch<BracketsResponse>(url)

  if (error) return <p>There is an error.</p>
  if (!data) return <div>Loading...</div>
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
        <NHLBrackets data={data.data.brackets} />
       </div>

      {/* <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='bg-red-200'>works</div>
        <div className='bg-red-200'>works</div>
        <div className='bg-red-200'>works</div>
      </div>  */}
    </div>
  )
}