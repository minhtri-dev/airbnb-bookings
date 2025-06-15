import { Request, Response } from 'express'
import { fetchAllBookedDatesForListing } from 'services/database/bookings.service'

import { BookingModel, BookingType } from '@/models/bookings.model'
import { ClientModel, ClientType } from '@/models/clients.model'

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

export const createBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const bookingData: BookingType = req.body.booking

    BookingModel.insertOne({ ...bookingData, clientId: id })
    res.json()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create booking' })
  }
}

export const createBookingAndClient = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const clientData: ClientType = req.body.client
    const client = await ClientModel.insertOne(clientData)

    const bookingData: BookingType = req.body.booking
    const _bookingData: BookingType = { ...bookingData, clientId: client._id }
    BookingModel.insertOne(_bookingData)

    res.json()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create booking with new client' })
  }
}
