import MakePicks from '@/app/make-picks/page'
import type { Meta } from '@storybook/react'
import { SeriesGroup, SeriesStartedButton } from '@/app/make-picks/page'

const meta: Meta = {
  title: "Picks",
  component: SeriesGroup,
}


const SeriesGroupStartedStory = {
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

const SeriesGroupNotStartedStory = {
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