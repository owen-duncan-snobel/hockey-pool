import express from 'express'
import * as controller from '../controllers/nhlbrackets.controller'
const router = express.Router()

/**
 * @route GET /api/v1/NHLBrackets
 * @description Get all brackets
 * @access Public
 * @returns {Array} 200 - An array of brackets
 */
router.get('/', controller.getNhlBrackets)

export default router
