import { Request, Response } from 'express'
import { fetchAllListings, fetchListingById, searchListings } from '@/services/database/listing.service'

export const getListings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5
    const listings = await fetchAllListings(limit, page)
    res.json(listings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
}

export const getListingbyId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const listing = await fetchListingById(id)
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' })
      return
    }
    res.json(listing)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch listing' })
  }
}

export const getFilteredListings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { location, propertyType, bedrooms } = req.query
    if (!location) {
      res.status(400).json({ error: 'Location is required' })
      return
    }
    const numberOfBedrooms = bedrooms ? parseInt(bedrooms as string, 10) : undefined
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5
    const listings = await searchListings(location as string, propertyType as string, numberOfBedrooms, page, limit)
    res.json(listings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch filtered listings' })
  }
}
