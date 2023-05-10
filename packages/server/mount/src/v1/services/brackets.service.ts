import express from 'express'
import axios from 'axios'
import HttpException from '../../exceptions/http-exception'
import redis from '../../libs/redis/redis'

const TOURNAMENT_PLAYOFFS_URL =
	'https://statsapi.web.nhl.com/api/v1/tournaments/playoffs?expand=round.series'

export async function getBrackets(){
  const response = await axios.get(TOURNAMENT_PLAYOFFS_URL)

  if (response.status !== 200) throw new HttpException({
    message: response.data,
    status: response.status
  })

  const data: IPlayoff = response.data
  return data
}