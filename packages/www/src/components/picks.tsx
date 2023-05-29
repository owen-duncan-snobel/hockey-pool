import { PrismaNhlSeries, PrismaNhlTeam } from "@backend/types/playoffs"
import { useAuth } from "@clerk/nextjs"
import { API_URL } from "@clerk/nextjs/dist/server"
import { RadioGroup } from "@headlessui/react"
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import Image from "next/image"

export function SeriesGroup ({seriesStarted, series }: {
  seriesStarted: boolean,
  series: (PrismaNhlSeries & {
    teams: {
        team: PrismaNhlTeam | null
    }[]
})[]
}){
  const [allPicks, setHandleAllPicks] = useState(series.map(s => {
    return {
      round: s.round,
      season: s.season,
      seriesCode: s.seriesCode,
      teamId: -1
    }
  }))
  const [errors, setErrors] = useState<string[]>([])
  const { getToken, isLoaded, userId } = useAuth()
  if (!isLoaded || !userId) { // this is required to ensure that the user is logged in and can get a token
    return null
  }

  const handleInputChange = (index: number, teamId: number) => {
    const values = [...allPicks]
    values[index].teamId = teamId
    setHandleAllPicks(values)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const errors: string[] = []
    allPicks.forEach((p, i) => {
      if (p.teamId === -1) errors[i] = `Please select a team for series ${i + 1}`
    })
    setErrors(errors)
    if (errors.length > 0) return

    const token = await getToken()
    const response = await fetch(`${API_URL}/NHLPicks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        picks: allPicks
      })
    })
    if (!response.ok){
      // TODO: handle error message 
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        series.map((s, i) => {
          return (
            <div key={s.seriesCode}>
              {errors[i] && <div className='text-red-500 uppercase font-medium text-center'>{errors[i]}</div>}
            <RadioGroup 
              value={allPicks[i].teamId} 
              onChange={(teamId) => handleInputChange(i, teamId)} 
              className='mb-5 border rounded-md shadow-lg text-gray-900'
            >
              {
                s.teams.map((t, i) => {
                  return (
                    <RadioGroup.Option value={t.team?.id} key={t.team?.teamName} className={'relative'}>
                      {({ checked }) => (
                          <div className='flex'>
                            <div className={`${checked ? ' text-gray-900' : ''} ${i % 2 === 0 ? 'border-b' : ''}
                              flex gap-x-5 items-center px-2 py-3 text-xl font-normal w-full pr-10`} 
                            key={i}>
                              <Image src={t.team!.logo || ''} alt='' width={30} height={30} />
                              <span className=' cursor-pointer'>
                                {t.team?.name}
                              </span>

                            </div>
                              {checked && (<div className='absolute top-5 right-0 leading-none text-[10px] rotate-90'>
                                PICK
                              </div>)}
                          </div>
                      )}
                    </RadioGroup.Option>
                  )
                })
              }
            </RadioGroup>
          </div>
          )
        })
      }
      <SeriesStartedButton seriesStarted={seriesStarted} />
    </form>
  )
}

export function SeriesStartedButton ({seriesStarted}: {
  seriesStarted: boolean
}){
  return (
    <div className='flex justify-center'>
      <button 
        type='submit'
        disabled={seriesStarted}
        className={
          seriesStarted ?
            'border rounded-md shadow-md px-2 py-3 bg-gray-900 text-white' :
            'border rounded-md shadow-md px-2 py-3 bg-gray-900 text-white'
        }
      >
        {
          seriesStarted ?
            (<div className='flex items-center gap-x-2'>
              SERIES STARTED 
              <LockClosedIcon height={20}/> 
            </div>) :
            (<div className='flex items-center gap-x-2'>
              SUBMIT PICKS
              <LockOpenIcon height={20}/> 
            </div>)
        }
      </button>
    </div>  
  )
}