import { Router } from 'express'
import { getUnavailabilities, createBooking } from '@/controllers/bookings.controller'

const router = Router()

router.get('/booking/unavailibilites/:id', getUnavailabilities)
router.post('/booking/create', createBooking)

export default router