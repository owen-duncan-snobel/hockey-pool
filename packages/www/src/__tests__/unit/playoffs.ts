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

      it('should return an empty array if no series are found', () => {
        const series = NHLSeriesByPlayoffRound(playoff_data as unknown as IPlayoff, 5)
        expect(series).toBeDefined()
        expect(series.length).toBe(0)
      })

      it('should return an empty array if no rounds are found', () => {
        const series = NHLSeriesByPlayoffRound(playoff_data as unknown as IPlayoff, 6 as unknown as 1 | 2 | 3 | 4 | 5)
        expect(series).toBeDefined()
        expect(series.length).toBe(0)
      })

      it('should return an empty array if no data is found', () => {
        const series = NHLSeriesByPlayoffRound({} as unknown as IPlayoff, 1)
        expect(series).toBeDefined()
        expect(series.length).toBe(0)
      })
    })
  })

})