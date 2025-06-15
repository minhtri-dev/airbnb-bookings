import { Router } from 'express'
import {
  getListings,
  getListingbyId,
  getFilteredListings,
} from '@/controllers/listings.controller'

const router = Router()

router.get('/listings', getListings)
router.get('/listings/:id', getListingbyId)
router.get('/filter/listings', getFilteredListings)

export default router
