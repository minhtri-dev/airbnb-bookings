import { Router } from 'express'
import {
  getUnavailabilities,
  createBooking,
  createBookingAndClient,
} from '@/controllers/bookings.controller'

const router = Router()

router.get('/booking/unavailibilites/:id', getUnavailabilities)
router.post('/booking/create', createBooking)
router.post('/booking/create/newClient', createBookingAndClient)

export default router
