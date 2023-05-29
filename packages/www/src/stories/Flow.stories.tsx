import type { Meta } from '@storybook/react'
import NHLBrackets from "@/libs/react-flow/flow"
import { SeriesNode } from '@/libs/react-flow/custom-nodes'
const brackets = require('../constants/playoffs_round-3_game_1.json')

function Flow() {
  return <div className='h-screen'>
    <NHLBrackets data={brackets} />
  </div>
}

const meta: Meta = {
  title: "NHL Brackets",
  component: SeriesNode,
}
export default meta


export const NHLBracketsStory = {
  title: "NHL Brackets",
  render: () => <Flow />,
}