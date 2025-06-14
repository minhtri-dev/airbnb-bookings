import { Router } from 'express'

import bookingsroute from './bookings.route'
import listingsRoute from './listings.route'

const router = Router()

router.use(bookingsroute)
router.use(listingsRoute)

export default router