"use client"
import Image from 'next/image'
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState, Node, Edge, Handle, Position } from 'reactflow'
//import 'reactflow/dist/style.css'
import 'reactflow/dist/base.css'
import { playoffNodePosition } from '../utils/playoffs'
const data = require('playoffs_may-11.json')

console.log(playoffNodePosition(data))

interface IPlayoffNode {
  data: {
    location?: string
    teamName?: string
    logo: string
  }
}

function PlayoffNode({ data }: IPlayoffNode){
  return (

    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-[200px]">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          <Image src={data.logo} alt="logo" width={50} height={50} />
        </div>
        <div className="ml-2">
          <div className="text-gray-500">{data.location}</div>
          <div className="text-lg font-bold">{data.teamName}</div>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  custom: PlayoffNode,
};

const position = { x: 0, y: 0 }
const edgeType = 'smoothstep'

const initialNodes: Node[] = [
  {
    id: 'team-1-2-round-1',
    data: { label: ''},
    position: { x: 0, y: 0 },
    type: 'group'
  },

    {
    id: 'team-3-4-round-1',
    data: { label: ''},
    position: { x: 0, y: 0 },
    type: 'group'
  },


  {
    id: '1',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 10, y: 20},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },
  
  {
    id: '2',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 10, y: 100},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },

    {
    id: '3',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 10, y: 220},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '4',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 10, y: 300},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },
   
  {
    id: '5',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 10, y: 420},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '6',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 10, y: 500},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
   {
    id: '7',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 10, y: 620},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '8',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 10, y: 700},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },


   {
    id: '100',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 250, y: 120},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '101',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 250, y: 200},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
   {
    id: '102',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 250, y: 520},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '103',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 250, y: 600},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },

  // semi
  {
    id: '107',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 490, y: 320},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '108',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 490, y: 400},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  // finals
   {
    id: '109',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 730, y: 360},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },

   {
    id: '110',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 940, y: 360},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },

  // champion
  {
    id: 'champion',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 830, y: 260},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },

  // semis
  {
    id: '111',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1180, y: 320},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '112',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1180, y: 400},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },

   {
    id: '113',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 1420, y: 120},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '114',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1420, y: 200},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
   {
    id: '115',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 1420, y: 520},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '116',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1420, y: 600},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },



  {
    id: '9',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 1660, y: 20},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },
  
  {
    id: '10',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1660, y: 100},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },

    {
    id: '11',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 1660, y: 220},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '12',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1660, y: 300},
    parentNode: 'team-1-2-round-1',
    extent: 'parent',
    draggable: false
  },
   
  {
    id: '13',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 1660, y: 420},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '14',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1660, y: 500},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
   {
    id: '15',
    data: { location: 'Toronto', teamName: 'Maple Leafs', logo: '/toronto-maple-leafs-logo.png' },
    type: 'custom',
    position: { x: 1660, y: 620},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },
  {
    id: '16',
    data: { location: 'Tampa Bay', teamName: 'Lightning', logo:"tampa-bay-lightning.svg" },
    type: 'custom',
    position: { x: 1660, y: 700},
    parentNode: 'team-3-4-round-1',
    extent: 'parent',
    draggable: false
  },


]

const initialEdges: Edge[] = [
  // {
  //   id: 'e',
  //   source: '1',
  //   target: '2',
  // },

]

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <main className="flex h-screen">
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        // onEdgesChange={onEdgesChange}
      >
        <Background />
      </ReactFlow>
    </main>
  )
}
