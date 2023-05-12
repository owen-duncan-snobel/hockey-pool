"use client"
import { NHLSeriesNodes } from '@/utils/playoffs'
import { IPlayoff, IPlayoffSeries } from '@backend/types/playoffs'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import ReactFlow, { Background, useNodesState, Node } from 'reactflow'
import 'reactflow/dist/base.css'

interface IPlayoffNode {
  data: {
    teamName?: string
    logo: string
  }
}

interface ISeriesNode {
  data: IPlayoffSeries
}

function SeriesNode({ data }: ISeriesNode){
  const teams = data.matchupTeams

  if (!teams) return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
        </div>
      </div>
    </div>
  )
  return (
    <div>
      {data.currentGame.seriesSummary.seriesStatusShort}
      <div className="flex justify-center items-center">
        <div>
          {teams.map((team, i) => <PlayoffNode key={i} data={{
            teamName: team.team.name,
            logo: '',
          }} />)}
        </div>
      </div>
    </div>
  )
}

function FinalsNode({ data }: ISeriesNode){
  const teams = data.matchupTeams
  if (!teams) return (
    <div>
      <div className="flex justify-center items-center gap-x-2">
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
      </div>
    </div>
  )
  return (
    <div>
      {data.currentGame.seriesSummary.seriesStatusShort}
      <div className="flex justify-center items-center gap-x-2">
        {teams.map((team, i) => <PlayoffNode key={i} data={{
          teamName: team.team.name,
          logo: '',
        }} />
      )}
      </div>
    </div>
  )
}

function PlayoffNode({data}: IPlayoffNode){
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-[200px] my-2">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          <Image src={''} alt="" width={50} height={50} />
        </div>
        <div className="ml-2">
          <div className="text-sm font-bold">{data.teamName}</div>
        </div>
      </div>
    </div>
  )
}



export default function Home() {
  const [playoffData, setPlayoffData] = useState<IPlayoff | null>(null)
  
  useEffect(() => {
    const getPlayoffData = async () => {
      const response = await fetch('http://localhost:4000/api/v1/brackets')
      const data = await response.json()
      const brackets = data.data.brackets
      setPlayoffData(brackets)
    }
    getPlayoffData()
  }, [])

  if (!playoffData) return <div>Loading...</div>
  return <NHLBrackets data={playoffData} />
}

const nodeTypes = {
  seriesNode: SeriesNode,
  finalsNode: FinalsNode,
};


function NHLBrackets({data}: {data: IPlayoff}){
  const initialNodes: Node[] = NHLSeriesNodes({
    data
  })

  const [nodes] = useNodesState(initialNodes)

  return (
    <main className="flex justify-center h-screen">
      <div className='w-5/6 h-full'>
        <ReactFlow 
          nodes={nodes} 
          nodeTypes={nodeTypes}
          minZoom={0.1}
          zoomOnPinch={true}
          fitView
          fitViewOptions={{
            padding: 0.1
          }}
        >
          <Background />
        </ReactFlow>
      </div>
    </main>
  )
}
