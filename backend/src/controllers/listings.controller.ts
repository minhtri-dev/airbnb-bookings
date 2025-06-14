import { Request, Response } from 'express'
import { getAllListings } from '@/services/database/listing.service'

export const getListings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const listings = await getAllListings()
    res.json(listings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
}