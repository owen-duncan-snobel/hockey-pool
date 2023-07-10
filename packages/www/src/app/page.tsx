"use client"
import NHLBrackets from '@/libs/react-flow/flow'
import { useBrackets } from '@/hooks/hooks'
import MainMenu from '@/components/menu'
import Image from 'next/image'
import { DeviceFrameset } from 'react-device-frameset'
import './devices.min.css'


export default function Home() {
  return (
    <div className='h-screen relative overflow-hidden'>
      <div className='sticky top-2 float-right px-2 z-10'>
        <MainMenu />
      </div>

      <div className='h-10' />

      <div className='flex justify-center'>
        <Image src='/hockeypool.png' alt='logo' width={80} height={80} />
      </div>

      <div className='h-5 md:h-10' />

      <div>
        <h1 className='text-7xl font-bold text-center'>
          Hockey Pool
        </h1>
      </div>

      <div className='h-5' />

      <div className='flex justify-center'>
        <div className='bg-black h-2 w-24' />
      </div>

      <div className='h-5' />

      <div className=''>
        <div className=''>
          <h1 className='text-xl font-normal text-center'>
            Doherty & Ralph Hockey Pool
          </h1>
          <h1 className='text-xl uppercase text-center font-bold'>
            2023
          </h1>
        </div>

        <div className='md:h-20' />

        <div className='flex justify-center p-5'>
          <DeviceFrameset device='iPhone X'>
            <div className='bg-white w-full h-full pt-5'>
              <Image src={'/phone_brackets.png'} alt="" width={500} height={600} />
            </div>
          </DeviceFrameset>
        </div>
      </div>
    </div>
  )
}
