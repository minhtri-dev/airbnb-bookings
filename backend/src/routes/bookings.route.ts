import { Router } from 'express'
import { getUnavailabilities } from '@/controllers/bookings.controller'

const router = Router()

router.get('/booking/unavailibilites/:id', getUnavailabilities)

export default router