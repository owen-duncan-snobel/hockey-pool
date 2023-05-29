import type { Meta } from '@storybook/react'
import MainMenu from '@/components/menu'
import { ClerkProvider } from '@clerk/nextjs'

const meta: Meta = {
  title: "Menu",
  component: MainMenu
}

export default meta
 
export const Menu = {
  title: "Menu",
  render: () => (
    <ClerkProvider>
      <div className='flex float-right'>
        <MainMenu />
      </div>
    </ClerkProvider>
  ),
}