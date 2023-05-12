import { NHLSeriesByPlayoffRound } from "../../utils/playoffs"
import playoff_data from '../playoffs_may-11.json'
import { IPlayoff } from "@backend/types/playoffs"


describe('Playoff Utils', () => {
  describe('NHL series in playoff round', () => {
    describe('Round 1', () => {
      it('should return an array of series', () => {
        const series = NHLSeriesByPlayoffRound(playoff_data as unknown as IPlayoff, 1)
        expect(series).toBeDefined()
        expect(series.length).toBe(8)
      })
    })
  })
})