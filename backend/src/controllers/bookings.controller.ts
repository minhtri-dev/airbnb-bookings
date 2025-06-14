import { Request, Response } from 'express'
import { fetchAllBookedDatesForListing } from 'services/database/bookings.service'

import { BookingModel } from '@/models/bookings.model'

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
    const {
      clientId,
      listingId,
      startDate,
      endDate,
      daytimePhoneNumber,
      mobileNumber,
      postalAddress,
      homeAddress,
    } = req.body;

    const bookingData: Record<string, any> = {};
    if (clientId) bookingData.clientId = clientId; //TODO: change to just clientid
    if (listingId) bookingData.listingId = listingId;
    if (startDate) bookingData.startDate = new Date(startDate);
    if (endDate) bookingData.endDate = new Date(endDate);
    if (daytimePhoneNumber) bookingData.daytimePhoneNumber = daytimePhoneNumber;
    if (mobileNumber) bookingData.mobileNumber = mobileNumber;
    if (postalAddress) bookingData.postalAddress = postalAddress;
    if (homeAddress) bookingData.homeAddress = homeAddress;

    BookingModel.insertOne(bookingData)
    res.json()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
}
