import express from 'express'
import { getCurrentSeasonPlayoffStandings } from '../controllers/nhlstandings.controller'
import { clerkClient } from '../../libs/clerk/clerk'

const router = express.Router()

/**
 * @route GET /api/v1/NHLStandings/
 * @description Get all standings
 * @access Private
 * @returns {array} 200 - An object containing the current season's playoff standings for all users
 */
router.get('/', clerkClient.expressWithAuth(), getCurrentSeasonPlayoffStandings)

export default router
