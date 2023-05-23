import express from 'express'
import * as controller from '../controllers/nhlpicks.controller'
const router = express.Router()
import clerkClient, {
  ClerkExpressWithAuth,
} from '@clerk/clerk-sdk-node'

/**
 * @route GET /api/v1/NHLPicks
 * @description Get all picks
 * @access Public
 * @returns {Array} 200 - An array of picks
 */
router.get('/', clerkClient.expressWithAuth(), controller.getNhlBracketPicks)

/**
 * @route POST /api/v1/NHLPicks
 * @description Create new picks
 * @access Public
 * @returns {Object} 201 
 */
router.post('/', clerkClient.expressWithAuth(), controller.createNhlBracketPicks)

export default router