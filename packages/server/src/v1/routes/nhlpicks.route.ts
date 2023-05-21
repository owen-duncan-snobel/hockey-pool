import express from 'express'
import * as controller from '../controllers/nhlpicks.controller'
const router = express.Router()
import {
  ClerkExpressWithAuth,
} from '@clerk/clerk-sdk-node'

/**
 * @route GET /api/v1/NHLPicks
 * @description Get all picks
 * @access Public
 * @returns {Array} 200 - An array of picks
 */
router.get('/', controller.getNhlBracketPicks)

/**
 * @route POST /api/v1/NHLPicks
 * @description Create new picks
 * @access Public
 * @returns {Object} 201 
 */
router.post('/', ClerkExpressWithAuth({}), controller.createNhlBracketPicks)

export default router