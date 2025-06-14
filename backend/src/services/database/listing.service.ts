import { ListingModel } from '@/models/listings.model'

interface ListingCriteria {
  "address.market": string;
  property_type?: string;
  bedrooms?: number;
}

export const fetchAllListings = async (limit = 10, page = 1) => {
  return await ListingModel.paginate({}, { limit, page })
}

export const fetchListingById = async (id: string) => {
  return await ListingModel.findById(id)
}

export const searchListings = async (location: string, propertyType?: string, bedrooms?: number, page = 1, limit = 10) => {
  const criteria: ListingCriteria = {
    "address.market": location,
  }
  if (propertyType) {
    criteria.property_type = propertyType
  }
  if (bedrooms !== undefined && !isNaN(bedrooms)) {
    criteria.bedrooms = bedrooms
  }
  return await ListingModel.paginate(criteria, { limit, page })
}
