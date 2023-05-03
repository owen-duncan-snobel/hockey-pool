import express from 'express'
import clerk from '../../libs/clerk/clerk'
import bodyParser from 'body-parser';

const router = express.Router()

router.post('/clerk', bodyParser.raw({ type: 'application/json' }), clerk)

export default router