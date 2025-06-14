import { useState } from 'react'

import { PropertyFilterForm, PropertyCard } from './components'
import type { IListing } from 'interfaces/Listing';
import { fetchListings } from 'services/express.api';

const Home = () => {
  const [listings, setListings] = useState<IListing[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const filters = new FormData(event.currentTarget)
    const location = filters.get('location') as string
    const propertyType = (filters.get('propertyType') as string) || ''
    const bedrooms = (filters.get('bedrooms') as string) || ''

    const data = await fetchListings(location, propertyType, bedrooms)
    setListings(data)
  }

  const propertyCards = []
  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i]
    propertyCards.push(
      <PropertyCard
        key={listing._id}
        name={listing.name ?? 'No Name'}
        description={listing.summary ?? listing.description ?? ''}
        rating={listing.review_scores?.review_scores_rating ?? 0}
        price={listing.price ?? 0}
        listingUrl={listing.listing_url ?? '#'}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top Section: Filter Form */}
      <div className="max-w-4xl mx-auto bg-white shadow p-6 mb-8 rounded">
        <h2 className="text-2xl font-semibold mb-4">Filter Listings</h2>
        <PropertyFilterForm onSubmit={(e) => void handleSubmit(e)} />
      </div>

      {/* Bottom Section: Listings */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {propertyCards.length > 0 ? propertyCards : (
          <div>No listings found. Try adjusting your search.</div>
        )}
      </div>
    </div>
  )
}

export default Home