import { IPlayoff } from "@backend/types/playoffs"
import { FinalsNode, SeriesNode } from "./custom-nodes"
import { useScreen } from "usehooks-ts"
import { NHLSeriesNodes } from "@/utils/playoffs"
import ReactFlow, { useNodesState, Node, Background } from "reactflow"

const nodeTypes = {
  seriesNode: SeriesNode,
  finalsNode: FinalsNode,
}

const defaultViewport = { x: 0, y: 120, zoom: 0.45 }

function NHLBrackets({data}: {data: IPlayoff}){
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

export default NHLBrackets