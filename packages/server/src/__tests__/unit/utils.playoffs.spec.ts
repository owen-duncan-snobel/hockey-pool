import { NhlSeries, NhlTeam } from '@prisma/client'
import * as playoffs from '../../utils/playoffs'


describe('Playoffs utils', () => {
  describe('validPlayoffRounds', () => {
    it('should return the valid playoff rounds', () => {
      const picksDto = [
        {
          teamId: 1,
          round: 1,
          season: '20202021',
          seriesCode: 'A'
        },
        {
          teamId: 2,
          round: 1,
          season: '20202021',
          seriesCode: 'B'
        },
      ]
      const round = 1
      const valid = playoffs.validPlayoffRounds({picksDto, round})
      expect(valid).toBe(true)
    })
    it('should return the invalid playoff rounds', () => {
      const picksDto = [
        {
          teamId: 1,
          round: 1,
          season: '20202021',
          seriesCode: 'A'
        },
        {
          teamId: 2,
          round: 2,
          season: '20202021',
          seriesCode: 'B'
        },
      ]
      const round = 1
      const valid = playoffs.validPlayoffRounds({picksDto, round})
      expect(valid).toBe(false)
    })
    it ('should return the invalid playoff rounds for undefined round', () => {
      const picksDto = [
        {
          teamId: 1,
          round: 1,
          season: '20202021',
          seriesCode: 'A'
        },
        {
          teamId: 2,
          round: 2,
          season: '20202021',
          seriesCode: 'B'
        },
      ]
      const round = undefined
      const valid = playoffs.validPlayoffRounds({picksDto, round})
      expect(valid).toBe(false)
    })
    it('should return the valid playoff rounds for empty array', () => {
      const picksDto = []
      const round = 1
      const valid = playoffs.validPlayoffRounds({picksDto, round})
      expect(valid).toBe(true)
    })
  })

  describe('validPlayoffSeasons', () => {
    it('should return the valid playoff seasons', () => {
      const picksDto = [
        {
          teamId: 1,
          round: 1,
          season: '20202021',
          seriesCode: 'A'
        },
        {
          teamId: 2,
          round: 1,
          season: '20202021',
          seriesCode: 'B'
        },
      ]
      const season = '20202021'
      const valid = playoffs.validPlayoffSeasons({picksDto, season})
      expect(valid).toBe(true)
    })

    it('should return the invalid playoff seasons', () => {
      const picksDto = [
        {
          teamId: 1,
          round: 1,
          season: '20202021',
          seriesCode: 'A'
        },
        {
          teamId: 2,
          round: 1,
          season: '20212022',
          seriesCode: 'B'
        },
      ]
      const season = '20202021'
      const valid = playoffs.validPlayoffSeasons({picksDto, season})
      expect(valid).toBe(false)
    })

    it('should return the invalid playoff seasons for undefined season', () => {
      const picksDto = [
        {
          teamId: 1,
          round: 1,
          season: '20202021',
          seriesCode: 'A'
        },
        {
          teamId: 2,
          round: 1,
          season: '20212022',
          seriesCode: 'B'
        },
      ]
      const season = undefined
      const valid = playoffs.validPlayoffSeasons({picksDto, season})
      expect(valid).toBe(false)
    })

    it('should return the valid playoff seasons for empty array', () => {
      const picksDto = []
      const season = '20202021'
      const valid = playoffs.validPlayoffSeasons({picksDto, season})
      expect(valid).toBe(true)
    })
  })

  describe('playoffSeriesHaveNotStarted', () => {
    it('should return true if series have not started', () => {
      const series: (NhlSeries & {
        teams: {
          team: NhlTeam | null;
        }[]
      })[] = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          currentGameId: 1,
          gameLabel: '',
          gameNumber: 1,
          seriesStatus: '',
          seriesStatusShort: '',
          season: '20202021',
          round: 1,
          seriesCode: 'A',
          gameTime: new Date(Date.now() + 1000),
          teams: [
            {
              team: {
                id: 1,
                name: 'Team 1',
                link: '',
                abbreviation: '',
                teamName: '',
                locationName: '',
                firstYearOfPlay: '',
                officialSiteUrl: '',
                conferenceId: 1,
                divisionId: 1,
                logo: '',
                active: true,
              }
            }
          ]
        }
      ]
      const valid = playoffs.playoffSeriesHaveNotStarted(series)
      expect(valid).toBe(true)
    })

    it('should return false if series gameTime < Date.now()', () => {
      const series: (NhlSeries & { 
        teams: {
          team: NhlTeam | null;
        }[]
      })[] = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          currentGameId: 1,
          gameLabel: '',
          gameNumber: 1,
          seriesStatus: '',
          seriesStatusShort: '',
          season: '20202021',
          round: 1,
          seriesCode: 'A',
          gameTime: new Date(Date.now() - 1000),
          teams: [
            {
              team: {
                id: 1,
                name: 'Team 1',
                link: '',
                abbreviation: '',
                teamName: '',
                locationName: '',
                firstYearOfPlay: '',
                officialSiteUrl: '',
                conferenceId: 1,
                divisionId: 1,
                logo: '',
                active: true,
              }
            }
          ]
        }
      ]
      const valid = playoffs.playoffSeriesHaveNotStarted(series)
      expect(valid).toBe(false)
    })

    it('should return false if series gameNumber !== 1', () => {
       const series: (NhlSeries & { 
        teams: {
          team: NhlTeam | null;
        }[]
      })[] = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          currentGameId: 1,
          gameLabel: '',
          gameNumber: 2,
          seriesStatus: '',
          seriesStatusShort: '',
          season: '20202021',
          round: 1,
          seriesCode: 'A',
          gameTime: new Date(Date.now() + 1000),
          teams: [
            {
              team: {
                id: 1,
                name: 'Team 1',
                link: '',
                abbreviation: '',
                teamName: '',
                locationName: '',
                firstYearOfPlay: '',
                officialSiteUrl: '',
                conferenceId: 1,
                divisionId: 1,
                logo: '',
                active: true,
              }
            }
          ]
        }
      ]

      const valid = playoffs.playoffSeriesHaveNotStarted(series)
      expect(valid).toBe(false)
    })
  })
})