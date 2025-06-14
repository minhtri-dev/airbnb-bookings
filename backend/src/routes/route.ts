import { Router } from 'express'
import { contollerFunction } from '@/controllers/controller'

const router = Router()

router.get('/route', contollerFunction)

export default router