import { Router } from 'express'

import route from './route'
import listingsRoute from './listings.route'

const router = Router()

router.use(route)
router.use(listingsRoute)

export default router