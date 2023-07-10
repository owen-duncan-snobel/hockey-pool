import axios from 'axios'
import HttpException from '../exceptions/http-exception'
import { TOURNAMENT_PLAYOFFS_URL } from '../constants/playoffs'

// TODO the response objects should be typed
export const getNhlBrackets = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) {
    throw new HttpException({
      message: response.data,
      status: response.status,
    })
  }
  const { data } = response
  return data
}

export const currentPlayoffRound = async () => {
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)
  if (response.status !== 200) {
    throw new HttpException({
      message: response.data,
      status: response.status,
    })
  }
  const { data } = response
  return data.defaultRound // the round index will be defaultRound - 1
}
