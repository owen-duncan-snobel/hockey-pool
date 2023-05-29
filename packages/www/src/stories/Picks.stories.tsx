import type { Meta } from '@storybook/react'
import { SeriesGroup, SeriesStartedButton } from '@/components/picks'

const meta: Meta = {
  title: "Picks",
  component: SeriesGroup,
}


export const SeriesGroupStartedStory = {
  title: "Series Group Started",
  render: () => (
    <div className='flex justify-center h-5/6 md:h:3/4'>
      <div className=''> 
        <SeriesGroup 
          seriesStarted={true}
          series={[]}
        />
      </div>
    </div>
  )
}

export const SeriesGroupNotStartedStory = {
  title: "Series Group Started",
  render: () => (
    <div className='flex justify-center h-5/6 md:h:3/4'>
      <div className=''> 
        <SeriesGroup 
          seriesStarted={false}
          series={[]}
        />
      </div>
    </div>
  )
}

export default meta