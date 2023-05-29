import type { Meta } from '@storybook/react'
import MainMenu from '@/components/menu'

const meta: Meta = {
  title: "Menu",
  component: MainMenu
}

export default meta
 
export const Menu = {
  title: "Menu",
  render: () => (
    <div className='flex float-right'>
      <MainMenu user={null} />
    </div>
  ),
}