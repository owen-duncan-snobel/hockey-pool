import ReactFlow, { Background, useNodesState, Node, Controls } from 'reactflow'
import Image from 'next/image'
import 'reactflow/dist/base.css'
import { TEAM_LOGO_BASE_URL } from '@/constants'
import { NHLSeriesNodes } from '@/utils/playoffs'
import { IPlayoff, IPlayoffSeries } from '@backend/types/playoffs'
import { useScreen } from 'usehooks-ts'

interface IPlayoffNode {
  data: {
    teamName?: string
    logo: string
  }
}

interface ISeriesNode {
  data: IPlayoffSeries
}

const nodeTypes = {
  seriesNode: SeriesNode,
  finalsNode: FinalsNode,
}

const defaultViewport = { x: 0, y: 120, zoom: 0.45 }

export function NHLBrackets({data}: {data: IPlayoff}){
  const screen = useScreen()
  const initialNodes: Node[] = NHLSeriesNodes({
    data
  })
  const [nodes] = useNodesState(initialNodes)

  return (
    <main className="flex justify-center h-full">
      <div style={{width: '70%', height: '70%'}}>
        <ReactFlow 
          nodes={nodes} 
          nodeTypes={nodeTypes}
          minZoom={0.1}
          zoomOnPinch={true}
          defaultViewport={defaultViewport}
          fitView={screen?.width && screen.width > 768 ? true : false} // uses defaultView port if on mobile
          zoomOnScroll={false}
        >
          <Background />
        </ReactFlow>
      </div>
    </main>
  )
}

export function PlayoffNode({data}: IPlayoffNode){
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-[200px] my-2">
      <div className="flex items-center">
        <div className="rounded-full w-12 h-12 flex justify-center items-center">
          <Image 
            alt=''
            src={data.logo} 
            placeholder='empty'
            width={30} 
            height={30}
          />
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium">{data.teamName}</div>
        </div>
      </div>
    </div>
  )
}

export function SeriesNode({ data }: ISeriesNode){
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
            logo: `${TEAM_LOGO_BASE_URL}/${team.team.name}.png`,
          }} />)}
        </div>
      </div>
    </div>
  )
}

export function FinalsNode({ data }: ISeriesNode){
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
          logo: `${TEAM_LOGO_BASE_URL}/${team.team.name}.png`,
        }} />
      )}
      </div>
    </div>
  )
}