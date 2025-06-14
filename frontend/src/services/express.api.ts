import axios from 'axios'
import type { IListing } from 'interfaces/Listing'

const API_URL: string = import.meta.env.VITE_API_URL as string;

export async function fetchListings(
  location: string,
  propertyType: string,
  bedrooms: string
): Promise<IListing[]> {
  const queryParams = new URLSearchParams()
  queryParams.append('location', location)
  if (propertyType.trim() !== '') {
    queryParams.append('property_type', propertyType)
  }
  if (bedrooms.trim() !== '') {
    queryParams.append('bedrooms', bedrooms)
  }

  try {
    const response = await axios.get(`${API_URL}/filter/listings/?${queryParams.toString()}`)
    return response.data as IListing[]
  } catch (error) {
    console.error('Error fetching listings:', error)
    throw error
  }
}