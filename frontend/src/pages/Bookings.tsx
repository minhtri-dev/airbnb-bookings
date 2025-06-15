import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getListingbyId } from 'services/express.api'
import { Loading } from '@components'
import type { IListing } from 'interfaces/Listing'

const Bookings = () => {
  const { listing_id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<IListing | null>(null)

  useEffect(() => {
    const validateAndFetchListing = async () => {
      if (!listing_id) {
        navigate('/')
        return
      }

      try {
        const listingFetched = await getListingbyId(listing_id)
        // If no listing found, redirect
        if (!listingFetched) {
          navigate('/')
        } else {
          setListing(listingFetched)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
        navigate('/')
      }
    }

    validateAndFetchListing()
  }, [listing_id, navigate])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Bookings for Listing: {listing?.name || listing_id}
      </h2>
      {/* Your booking form or listing details would be rendered here */}
    </div>
  )
}

export default Bookings