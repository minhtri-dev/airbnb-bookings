import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

import { validateListingId } from 'services/express.api'
import { Loading } from '@components'

const Bookings = () => {
  const { listing_id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const validateId = async () => {
      
      // Check for existence and valid MongoDB ObjectId format
      if (!listing_id || !/^[0-9a-fA-F]{24}$/.test(listing_id)) {
        navigate('/')
        return
      }
      // Validate via API
      const isValid = await validateListingId(listing_id)
      if (!isValid) {
        navigate('/')
      } else {
        setIsLoading(false)
      }
    }
    validateId()
  }, [listing_id, navigate])

  return (
    <div>
      {isLoading && <Loading />}
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Bookings for Listing {listing_id}</h2>
        {/* Your booking form or listing details would be rendered here */}
      </div>
    </div>
  )
}

export default Bookings
