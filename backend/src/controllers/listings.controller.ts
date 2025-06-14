import { Request, Response } from 'express'
import { fetchAllListings, fetchListingById, searchListings } from '@/services/database/listing.service'

export const getListings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const listings = await fetchAllListings(5)
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
    const listings = await searchListings(location as string, propertyType as string, numberOfBedrooms)
    res.json(listings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch filtered listings' })
  }
}
