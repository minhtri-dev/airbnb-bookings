import { Request, Response } from 'express'
import { fetchAllBookedDatesForListing } from 'services/database/bookings.service'

export const getUnavailabilities = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const unavailiabilities = await fetchAllBookedDatesForListing(id)
    res.json(unavailiabilities)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
}
