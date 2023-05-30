import express from 'express'
import * as controller from '../controllers/nhlseries.controller'

const router = express.Router()

/**
 * @route GET /api/v1/NHLSeries
 * @description Get all series
 * @access Public
 * @returns {Array} 200 - An array of series
 */
router.get('/', controller.getSeries)

/**
 * @route GET /api/v1/NHLSeries/active
 * @description Get all active series
 * @access Public
 * @returns {Array} 200 - An array of active series
 */
router.get('/active', controller.getActiveSeries)

export default router
