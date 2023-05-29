import type { Meta } from '@storybook/react'
import { 
  StandingsDialog,
  StandingsTable,
  StandingsTableRow,
  TableLayout
} from '@/components/standings'

const meta: Meta = {
  title: "User Standings",
  component: StandingsTable,
}

export default meta
 
export const UserStandings = {
  title: "User Standings Story",
  render: () => (
    <div className='flex w-1/2'>
      <StandingsTable standings={[
        {
          id: 1,
          picks: [
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Toronto%20Maple%20Leafs.png',
                  teamName: 'Toronto Maple Leafs'
                }
              },
              value: 5
            },
            {
              pick: {
                round: 2,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Ottawa%20Senators.png',
                  teamName: 'Ottawa Senators'
                }
              },
              value: 10
            }
          ],
          points: 15,
          username: 'test'
        },
        {
          id: 2,
          picks: [
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Montr%C3%A9al%20Canadiens.png',
                  teamName: 'Montréal Canadiens'
                }
              },
              value: 5
            },
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Toronto%20Maple%20Leafs.png',
                  teamName: 'Toronto Maple Leafs'
                }
              },
              value: 5
            },
          ],
          points: 10,
          username: 'test 1'
        },
        {
          id: 3,
          picks: [
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Ottawa%20Senators.png',
                  teamName: 'Ottawa Senators'
                }
              },
              value: 5
            }
          ],
          points: 5,
          username: 'test 2'
        }
      ]} />
    </div>
  ),
}

export const SkeletonTable = {
  title: "Skeleton Table",
  render: () => (
    <div className='flex w-1/2'>
      <StandingsTable standings={[]} />
    </div>
  ),
}

export const Dialog = {
  title: "Dialog",
  render: () => (
    <div className='flex w-1/2'>
      <StandingsDialog
        openDialog={{
          isOpen: true,
          standingsIndex: 0
        }}
        setOpenDialog={() => {}}
        standings={[
        {
          id: 1,
          picks: [
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Toronto%20Maple%20Leafs.png',
                  teamName: 'Toronto Maple Leafs'
                }
              },
              value: 5
            },
            {
              pick: {
                round: 2,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Ottawa%20Senators.png',
                  teamName: 'Ottawa Senators'
                }
              },
              value: 10
            }
          ],
          points: 15,
          username: 'test'
        },
        {
          id: 2,
          picks: [
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Montr%C3%A9al%20Canadiens.png',
                  teamName: 'Montréal Canadiens'
                }
              },
              value: 5
            },
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Toronto%20Maple%20Leafs.png',
                  teamName: 'Toronto Maple Leafs'
                }
              },
              value: 5
            },
          ],
          points: 10,
          username: 'test 1'
        },
        {
          id: 3,
          picks: [
            {
              pick: {
                round: 1,
                season: '20222023',
                seriesWins: 4,
                team: {
                  logo: 'https://hockey-pool.nyc3.digitaloceanspaces.com/nhl-logos/Ottawa%20Senators.png',
                  teamName: 'Ottawa Senators'
                }
              },
              value: 5
            }
          ],
          points: 5,
          username: 'test 2'
        }
      ]} />
    </div>
  ),
}


export const TableLayoutStory = {
  title: "Table Layout",
  render: () => (
    <div className='flex w-1/2'>
      <TableLayout
        thead={(
          <tr>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Rank
            </th>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Points
            </th>
          </tr>
        )}
        tbody={(
          <>
          <tr>
            <td className="px-10 py-2 text-gray-900">
              1
            </td>
            <td className="px-10 py-2 text-gray-900">
              test
            </td>
            <td className="px-10 py-2 text-gray-900">
              15
            </td>
          </tr>
          <tr>
            <td className="px-10 py-2 text-gray-900">
              1
            </td>
            <td className="px-10 py-2 text-gray-900">
              test
            </td>
            <td className="px-10 py-2 text-gray-900">
              15
            </td>
          </tr>
          <tr>
            <td className="px-10 py-2 text-gray-900">
              1
            </td>
            <td className="px-10 py-2 text-gray-900">
              test
            </td>
            <td className="px-10 py-2 text-gray-900">
              15
            </td>
          </tr>
          </>
        )}
      />
    </div>
  ),
  argTypes: {
    thead: {
      control: {
        type: 'text'
      }
    },
  }
}


export const StandingsTableRowStory = {
  title: "Standings Table Row",
  render: () => (
    <div className='flex w-1/2'>
      <TableLayout 
        thead={(
          <tr>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Rank
            </th>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-10 py-2 font-medium text-gray-900">
              Points
            </th>
          </tr>
        )}
        tbody={
          <StandingsTableRow 
          user={{
            id: 1,
            picks: [],
            points: 15,
            username: 'test'
          }}
          index={0}
          setOpenDialog={() => {}}
        />
      }
      />
    </div>
  ),
}