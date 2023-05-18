import axios from 'axios'
import HttpException from '../../exceptions/http-exception'
import { IPlayoff } from '../../types/playoffs'
import { TOURNAMENT_PLAYOFFS_URL } from '../../constants/playoffs'

export const getBrackets = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) throw new HttpException({
    message: response.data,
    status: response.status
  })
  const data: IPlayoff = response.data
  return data
}

export const currentPlayoffRound = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) throw new HttpException({
      message: response.data,
      status: response.status
  })
  const data: IPlayoff = response.data
  return data.defaultRound // the round index will be defaultRound - 1
}