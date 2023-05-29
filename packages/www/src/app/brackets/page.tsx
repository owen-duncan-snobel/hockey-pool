"use client"
import NHLBrackets from '@/libs/react-flow/flow'
import { useBrackets } from '@/hooks/hooks'
import MainMenu from '@/components/menu'
import { useUser } from '@clerk/nextjs'

export default function Brackets() {
  const { brackets, error, isLoading } = useBrackets()

  if (error) return <p>There is an error.</p>
  if (isLoading) return <div>Loading...</div>
  if (!brackets) return <div></div>

   const { user } = useUser()

  return (
    <div>
      <div className='sticky top-2 float-right px-2 z-10'>
        <MainMenu user={user} />
      </div>

      <div className='h-10' />

      <div className='h-screen'>
        <div>
          <div className='flex w-full justify-center px-10'>
            <h1 className='text-4xl font-medium uppercase text-center'>
              Brackets
            </h1> 
          </div>
        </div>
          
        <div className='md:h-20' />

        <div className='h-5/6 md:h:3/4 -z-10'>     
          <NHLBrackets data={brackets} />
        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-3'>
          <div className='bg-red-200'>works</div>
          <div className='bg-red-200'>works</div>
          <div className='bg-red-200'>works</div>
        </div>  */}
      </div>
    </div>
  )
}