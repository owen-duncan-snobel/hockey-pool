import { IPlayoffUserStanding } from "@backend/types/playoffs"
import { Dialog } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import { useState } from "react"

export function StandingsTable({standings}: {standings: IPlayoffUserStanding[]}) {
  let [openDialog, setOpenDialog] = useState({
    isOpen: false,
    standingsIndex: 0
  })

  if (!standings || standings.length === 0) return (
    <div>
      <TableLayout 
        thead={(
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
        )}
        tbody={<StandingsTableBodySkeleton />}
      />
    </div>
  )

  return (
    <div className='p-5'>
      <TableLayout
        thead={(
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
        )}
        tbody={(
          <>
            {standings.map((user, index) => <StandingsTableRow 
              key={user.id} 
              user={user} 
              index={index}
              setOpenDialog={setOpenDialog}
            />
            )}
          </>
        )}
      />
  
      <StandingsDialog 
        openDialog={openDialog}  
        standings={standings}
        setOpenDialog={setOpenDialog}
      />
    </div>
  )
}

export function StandingsTableRow({
  user, 
  index, 
  setOpenDialog 
}: {
  user: IPlayoffUserStanding, 
  index: number, 
  setOpenDialog: React.Dispatch<React.SetStateAction<{
    isOpen: boolean
    standingsIndex: number
  }>>
}){
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
        <button className='bg-gray-700 text-white px-2 py-1 rounded-md flex items-center'>
          {user.username}    
          <ChevronRightIcon height={15} width={15} />
        </button>
      </td>
      <td className="whitespace-nowrap px-10 py-2 text-gray-900">{user.points}</td>
    </tr>
  )
}

export function TableLayout ({thead, tbody}: {thead: React.ReactElement, tbody: React.ReactElement}) {
  return (
    <div className="overflow-x-auto rounded-md border shadow-lg">
      <table className="min-w-full divide-y-2 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          {thead}
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tbody}
        </tbody>
      </table>
    </div>
  )
}

export function StandingsTableBodySkeleton(){
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

export function StandingsDialog({
  openDialog,
  setOpenDialog,
  standings
}: {
  openDialog: {
    isOpen: boolean
    standingsIndex: number
  },
  setOpenDialog: React.Dispatch<React.SetStateAction<{
    isOpen: boolean
    standingsIndex: number
  }>>,
  standings: IPlayoffUserStanding[]
}){
  return (
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
        <div className="flex min-h-full items-center justify-center">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto w-5/6 max-w-[600px] rounded bg-white">
            {/* <div className='flex justify-center bg-gray-900 rounded-t text-white'>
              Season
            </div> */}
            <Dialog.Title>
              <TableLayout 
                thead={
                  (
                    <tr>
                      <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
                        Team
                      </th>
                      <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
                        Round
                      </th>
                      <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
                        Points
                      </th>
                    </tr>
                  )
                }
                tbody={(
                  <>
                    {standings[openDialog.standingsIndex].picks
                      .sort((a,b) => a.pick.round - b.pick.round)
                      .map((pick, index) => {
                      return (
                        <tr key={`${pick.pick.team?.teamName}-${index}`} >
                          <td 
                            className="whitespace-nowrap px-10 py-2 text-gray-900"
                          >
                              <Image 
                                src={pick.pick.team?.logo || ''} 
                                alt={pick.pick.team?.teamName || ''} 
                                width={30} 
                                height={30} 
                              />
                          </td>
                          <td 
                            className="whitespace-nowrap px-10 py-2 text-gray-900"
                          >
                            {pick.pick.round}
                          </td>
                          <td 
                            className="whitespace-nowrap px-10 py-2 text-gray-900"
                          >
                            {pick.pick.seriesWins === 4 ? pick.value : 0}
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td className="whitespace-nowrap px-5 font-bold text-gray-900">Total Points</td>
                      <td className="whitespace-nowrap px-10 py-2 text-gray-900"></td>
                      <td className="whitespace-nowrap px-10 py-2 text-gray-900 font-bold">{standings[openDialog.standingsIndex].points}</td>
                    </tr>
                  </>
                )}
              />
               
            </Dialog.Title>
            {/* ... */}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}