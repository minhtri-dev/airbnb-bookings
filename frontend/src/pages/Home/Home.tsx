import { useState, useEffect } from 'react'
import { PropertyFilterForm, PropertyCard } from './components'
import type { IListing } from 'interfaces/Listing'
import { fetchListings, fetchFilteredListings } from 'services/express.api'
import { Loading } from '@components'

const PAGE_SIZE = 5

const Home = () => {
  const [listings, setListings] = useState<IListing[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    async function loadListings() {
      const response = await fetchListings(1, PAGE_SIZE)
      setListings(response.docs)
      setTotalPages(response.totalPages)
      setIsLoading(false)
    }
    void loadListings()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(event.currentTarget)
      const location = formData.get('location') as string
      const propertyType = (formData.get('propertyType') as string) || ''
      const bedrooms = (formData.get('bedrooms') as string) || ''
      // Save filters for pagination
      setFilters({ location, propertyType, bedrooms })
      setCurrentPage(1)

      const data = await fetchFilteredListings(
        location,
        propertyType,
        bedrooms,
        1,
        PAGE_SIZE,
      )
      setListings(data.docs)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error in handleSubmit: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return
    setIsLoading(true)
    try {
      setCurrentPage(page)
      const { location, propertyType, bedrooms } = filters
      let data
      if (location === '') {
        data = await fetchListings(page, PAGE_SIZE)
      } else {
        data = await fetchFilteredListings(
          location,
          propertyType,
          bedrooms,
          page,
          PAGE_SIZE,
        )
      }
      setListings(data.docs)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error in handlePageChange: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const propertyCards = listings.map((listing) => (
    <PropertyCard
      key={listing._id}
      id={listing._id}
      name={listing.name ?? 'No Name'}
      description={listing.summary ?? listing.description ?? ''}
      rating={listing.review_scores?.review_scores_rating ?? 0}
      price={listing.price ?? 0}
    />
  ))

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Show loading indicator */}
      {isLoading && <Loading />}

      {/* Top Section: Filter Form */}
      <div className="mx-auto mb-8 max-w-4xl rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">Filter Listings</h2>
        <PropertyFilterForm onSubmit={(e) => void handleSubmit(e)} />
      </div>

      {/* Listings Section */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6">
        {propertyCards.length > 0 ? (
          propertyCards
        ) : (
          <div>No listings found. Try adjusting your search.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between">
          <button
            onClick={() => void handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => void handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
