import * as service from '../../v1/services/brackets.service'

describe('Brackets service' , () => {
    describe('getBrackets', () => {
        it('should return all brackets', async () => {
            const data = await service.getBrackets()
            expect(data).toBeDefined()
            expect(data).toHaveProperty('rounds')
            expect(data).toHaveProperty('season')
            expect(data).toHaveProperty('defaultRound')
        })
    })
})