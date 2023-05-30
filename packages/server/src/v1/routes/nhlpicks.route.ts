import express from 'express'
import * as controller from '../controllers/nhlpicks.controller'
import { clerkClient } from '../../libs/clerk/clerk'

const router = express.Router()

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
 * @access Private
 * @returns {Object} 201
 */
router.post('/', clerkClient.expressWithAuth(), controller.createNhlBracketPicks)

export default router
