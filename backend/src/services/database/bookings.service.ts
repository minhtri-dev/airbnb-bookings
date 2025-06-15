import { BookingModel } from 'models/bookings.model'

/**
 * Retrieves all booked dates for a specific listing.
 * @param listingId - The ID of the listing to retrieve booked dates for.
 * @returns An array of all booked dates for the listing.
 */
export const fetchAllBookedDatesForListing = async (
  listingId: string,
): Promise<Date[]> => {
  try {
    // Find all bookings for the given listing ID
    const bookings = await BookingModel.find({ listingId: listingId })
    // Extract all dates between startDate and endDate for each booking
    const bookedDates: Date[] = []
    bookings.forEach((booking) => {
      const currentDate = new Date(booking.startDate)
      const endDate = new Date(booking.endDate)

      // Generate all dates between startDate and endDate
      while (currentDate <= endDate) {
        bookedDates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1) // Increment by 1 day
      }
    })

    return bookedDates
  } catch (error) {
    console.error('Error retrieving booked dates:', error)
    throw new Error('Could not retrieve booked dates')
  }
}
