import { IPlayoffUserStanding } from "../../types/playoffs"
import { 
  getCurrentSeasonPlayoffStandingsForAllUsers 
} from "../../v1/services/nhlstandings.service"
import { prismaMock } from "../singleton"

describe('nhlstandings services', () => {
  describe('getCurrentSeasonPlayoffStandingsForAllUsers', () => {
    it('should return the standings', async () => {
      const standings: IPlayoffUserStanding[] = [
        {
          id: 1,
          picks: [
            {
              value: 10,
              pick: {
                seriesWins: 4,
                team: {
                  teamName: 'team1',
                  logo: 'logo1'
                },
                season: '20222023',
                round: 2 
              },
            }
          ],
          points: 10,
          username: 'user1'
        },
        {
          id: 2,
          picks: [
            {
              value: 5,
              pick: {
                seriesWins: 4,
                team: {
                  teamName: 'team1',
                  logo: 'logo1'
                },
                season: '20222023',
                round: 1 
              }     
            },
            {
              value: 10,
              pick: {
                seriesWins: 4,
                team: {
                  teamName: 'team1',
                  logo: 'logo1'
                },
                season: '20222023',
                round: 2 
              }     
            }
          ],
          points: 15,
          username: 'user2'
        }
      ] 

      type PrismaMockStandingsUser = {
        id: number
        username: string | null
        nhlBracketPicks: {
          value: number
          pick: {
            seriesWins: number
            team: {
              teamName: string
              logo: string | null
            } | null
          }[]
        }
      }

      prismaMock.user.findMany.mockResolvedValue([
        {
          id: 1,
          username: 'user1',
          nhlBracketPicks: [
            {
              value: 10,
              pick: {
                seriesWins: 4,
                team: {
                  teamName: 'team1',
                  logo: 'logo1'
                },
                season: '20222023',
                round: 2 
            }
          }]
        },
        {
          id: 2,
          username: 'user2',
          nhlBracketPicks: [
            {
              value: 5,
              pick: {
                seriesWins: 4,
                team: {
                  teamName: 'team1',
                  logo: 'logo1'
                },
                season: '20222023',
                round: 1 
            }
          },
          {
              value: 10,
              pick: {
                seriesWins: 4,
                team: {
                  teamName: 'team1',
                  logo: 'logo1'
                },
                season: '20222023',
                round: 2
            }
          }
        ]
        }
      ] as unknown as any)

      const data = await getCurrentSeasonPlayoffStandingsForAllUsers()
      expect(data).toEqual(standings.sort((a,b) => b.points - a.points))
    })
  })
})