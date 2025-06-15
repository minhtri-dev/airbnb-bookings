import { Router } from 'express'

import bookingsRoute from './bookings.route'
import listingsRoute from './listings.route'
import clientsRoute from './clients.route'

const router = Router()

router.use(clientsRoute)
router.use(bookingsRoute)
router.use(listingsRoute)

export default router
