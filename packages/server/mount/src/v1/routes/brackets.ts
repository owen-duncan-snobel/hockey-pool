import express from 'express'
import * as controller from '../controllers/brackets.controller'
const router = express.Router()

router.get('/', controller.getBrackets)

export default router