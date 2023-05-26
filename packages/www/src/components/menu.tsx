import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import { Bars2Icon } from '@heroicons/react/20/solid'
import { UserButton, useUser } from '@clerk/nextjs'

const SIGN_IN = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
const SIGN_UP = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
const USER_PROFILE = process.env.NEXT_PUBLIC_CLERK_USER_PROFILE_URL

export default function MainMenu() {
  const { user } = useUser()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className='flex gap-x-1 px-2 items-center'>
        <Menu.Button 
          className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-white bg-opacity-5 backdrop-blur-2xl">
          <Bars2Icon
            className="h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>
        {user && (
          <div className='border rounded-full'>
            <UserButton />
          </div>
        )}
        
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items 
          className="absolute right-2 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link href="/make-picks">
                  <button
                    className={`${
                      active ? ' bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-lg text-gray-900`}
                  >
                    Picks
                  </button>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/standings">
                  <button
                    className={`${
                      active ? ' bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-lg text-gray-900`}
                  >
                    Standings
                  </button>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/">
                  <button
                    className={`${
                      active ? ' bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-lg text-gray-900`}
                  >
                    Brackets
                  </button>
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? ' bg-gray-100' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-lg text-gray-900`}
                >
                  Game updates
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? ' bg-gray-100' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-lg text-gray-900`}
                >
                  Chat
                </button>
              )}
            </Menu.Item>
          </div>
          <div>
            {!user && (
              <div className="px-1 py-1">
                <Menu.Item>
                {({ active }) => (
                  <div>
                      <Link href={user ? USER_PROFILE! : SIGN_IN! }>
                        <button
                          className={`${
                            active ? ' bg-black-100' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-lg text-gray-900`}
                        >
                          {user ? "Dashboard" : "Login"}
                        </button>
                      </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
