import axios from 'axios'
import type { IListing } from 'interfaces/Listing'

const API_URL: string = import.meta.env.VITE_API_URL as string

// The API is expected to return an object with a docs array and totalPages
export async function fetchListings(
  location: string,
  propertyType: string,
  bedrooms: string,
  page: number = 1,
  limit: number = 5
): Promise<{ docs: IListing[], totalPages: number }> {
  const queryParams = new URLSearchParams()
  queryParams.append('location', location)
  if (propertyType.trim() !== '') {
    queryParams.append('property_type', propertyType)
  }
  if (bedrooms.trim() !== '') {
    queryParams.append('bedrooms', bedrooms)
  }
  queryParams.append('page', String(page))
  queryParams.append('limit', String(limit))

  try {
    const response = await axios.get(`${API_URL}/filter/listings/?${queryParams.toString()}`)
    return response.data as { docs: IListing[], totalPages: number }
  } catch (error) {
    console.error('Error fetching listings:', error)
    throw error
  }
}