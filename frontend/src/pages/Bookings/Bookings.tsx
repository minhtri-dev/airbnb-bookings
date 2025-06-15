import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getListingbyId, createBookingAndClient } from 'services/express.api'
import { Loading } from '@components'
import type { IListing } from 'interfaces/Listing'
import type { IClient } from 'interfaces/Client'
import ClientForm from './components/ClientForm'
import Calendar from './components/Calendar'

const Bookings = () => {
  const { listing_id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<IListing | null>(null)

  // State for selected booking dates as ISO strings and conflict flag
  const [bookingStartDate, setBookingStartDate] = useState<string | null>(null)
  const [bookingEndDate, setBookingEndDate] = useState<string | null>(null)
  const [dateConflict, setDateConflict] = useState<boolean>(false)

  // Fetch listing details
  useEffect(() => {
    const validateAndFetchListing = async () => {
      if (!listing_id) {
        void navigate('/')
        return
      }
      try {
        const listingFetched = await getListingbyId(listing_id)
        if (!listingFetched) {
          void navigate('/')
        } else {
          setListing(listingFetched)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
        void navigate('/')
      }
    }
    void validateAndFetchListing()
  }, [listing_id, navigate])

  // Update dates and conflict flag received from Calendar component
  const handleDatesChange = (
    start: string | null,
    end: string | null,
    conflict: boolean,
  ) => {
    setBookingStartDate(start)
    setBookingEndDate(end)
    setDateConflict(conflict)
  }

  const handleClientFormSubmit = async (client: IClient) => {
    // Validate that the date fields are set
    if (!bookingStartDate || !bookingEndDate) {
      alert('Please select both a start and an end date for your booking.')
      return
    }
    // Validate that all client fields are filled
    // Type-cast to string[] if the client values are known to be strings
    const clientValues = Object.values(client) as string[]
    const hasEmptyField = clientValues.some((val) => !val.trim())
    if (hasEmptyField) {
      alert('Please fill out all the fields before submitting.')
      return
    }
    // Validate date range conflicts using the flag from Calendar
    if (dateConflict) {
      alert(
        'The selected date range conflicts with existing bookings. Please choose a different range.',
      )
      return
    }

    // Process complete booking details (client + booking dates)
    const bookingDetails = {
      client,
      booking: {
        listingId: listing_id,
        startDate: bookingStartDate,
        endDate: bookingEndDate,
      },
    }
    console.log('Booking Details Submitted:', bookingDetails)
    await createBookingAndClient(bookingDetails)
    console.log('data successfully uploaded')
    void navigate('/confirmation')
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="mx-auto my-10 max-w-2xl rounded bg-gray-100 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Bookings for Listing: {listing?.name || listing_id}
      </h2>
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold">Select Booking Dates</h3>
        <Calendar listingId={listing_id!} onDatesChange={handleDatesChange} />
      </div>
      {/* Wrap the async callback to satisfy the expected void return */}
      <ClientForm
        onSubmit={(client: IClient) => {
          void handleClientFormSubmit(client)
        }}
      />
    </div>
  )
}

export default Bookings
