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
        const queryParams = new URLSearchParams()
        queryParams.append('page', "1")
        queryParams.append('limit', String(PAGE_SIZE))

        const response = await fetchListings(1, PAGE_SIZE)
        response as { docs: IListing[], totalPages: number }
        setListings(response.docs)
        setTotalPages(response.totalPages)
        setIsLoading(false)
      }
      loadListings()
      
    },[]
  ) 

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
      
      const data = await fetchFilteredListings(location, propertyType, bedrooms, 1, PAGE_SIZE)
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
        data = await fetchFilteredListings(location, propertyType, bedrooms, page, PAGE_SIZE)
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
      <div className="max-w-4xl mx-auto bg-white shadow p-6 mb-8 rounded">
        <h2 className="text-2xl font-semibold mb-4">Filter Listings</h2>
        <PropertyFilterForm onSubmit={(e) => void handleSubmit(e)} />
      </div>

      {/* Listings Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {propertyCards.length > 0 ? propertyCards : (
          <div>No listings found. Try adjusting your search.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto flex justify-between items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Home