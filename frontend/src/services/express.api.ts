import axios, { AxiosError } from 'axios'
import type { IListing } from 'interfaces/Listing'

const API_URL: string = import.meta.env.VITE_API_URL as string

// The API is expected to return an object with a docs array and totalPages
export async function fetchFilteredListings(
  location: string,
  propertyType: string,
  bedrooms: string,
  page: number = 1,
  limit: number = 5,
): Promise<{ docs: IListing[]; totalPages: number }> {
  const queryParams = new URLSearchParams()
  if (location.trim() !== '') {
    queryParams.append('location', location)
  }
  if (propertyType.trim() !== '') {
    queryParams.append('property_type', propertyType)
  }
  if (bedrooms.trim() !== '') {
    queryParams.append('bedrooms', bedrooms)
  }
  queryParams.append('page', String(page))
  queryParams.append('limit', String(limit))

  try {
    const response = await axios.get(
      `${API_URL}/filter/listings/?${queryParams.toString()}`,
    )
    return response.data as { docs: IListing[]; totalPages: number }
  } catch (error) {
    console.error('Error fetching listings:', error)
    throw error
  }
}

export async function fetchListings(
  page: number = 1,
  limit: number = 5,
): Promise<{ docs: IListing[]; totalPages: number }> {
  const queryParams = new URLSearchParams()
  queryParams.append('page', String(page))
  queryParams.append('limit', String(limit))
  try {
    const response = await axios.get(
      `${API_URL}/listings/?${queryParams.toString()}`,
    )
    return response.data as { docs: IListing[]; totalPages: number }
  } catch (error) {
    console.error('Error fetching listings:', error)
    throw error
  }
}

export async function getListingbyId(
  listing_id: string,
): Promise<IListing | null> {
  try {
    const response = await axios.get(`${API_URL}/listings/${listing_id}`)
    if (response.status === 200) {
      return response.data as IListing
    }
    return null
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 404) {
      return null
    }
    throw axiosError
  }
}

export async function createBookingAndClient(
  data: Record<string, unknown>,
): Promise<void> {
  try {
    await axios.post(`${API_URL}/booking/create/newClient`, data)
    return
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 404) {
      console.error('Error creating new booking/client:', axiosError.response)
      throw axiosError
    }
  }
}
