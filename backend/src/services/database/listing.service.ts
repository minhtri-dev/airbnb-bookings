import { ListingModel } from '@/models/listings.model'

export const getAllListings = async () => {
  return await ListingModel.find().limit(10)
}

export const getListingById = async (id: string) => {
  return await ListingModel.findById(id)
}
