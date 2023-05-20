import express from 'express'
import * as controller from '../controllers/nhlbrackets.controller'

const router = express.Router()

router.get('/', controller.getNhlBrackets)

export default router
