import { NHLTeamsInRound } from "../../utils/playoffs"
import playoff_data from '../playoffs_may-11.json'
import { IPlayoff } from "@backend/types/playoffs"


describe('Playoff Utils', () => {
  describe('NHL teams in round', () => {
    it('should return an array of teams', () => {
      const teams = NHLTeamsInRound({
        data: playoff_data as unknown as IPlayoff,
        round: 1
      })
      expect(teams).toBeDefined()
      expect(teams.length).toBe(16)
    })

    it('should return an empty array if round is not found', () => {
      const teams = NHLTeamsInRound({
        data: playoff_data as unknown as IPlayoff,
        round: 5 as 1 | 2 | 3 | 4
      })
      expect(teams).toBeDefined()
      expect(teams.length).toBe(0)
    })

    it('should return an empty array if series is not found', () => {
      const teams = NHLTeamsInRound({
        data: playoff_data as unknown as IPlayoff,
        round: 3
      })
      expect(teams).toBeDefined()
      expect(teams.length).toBe(0)
    })
  })
})