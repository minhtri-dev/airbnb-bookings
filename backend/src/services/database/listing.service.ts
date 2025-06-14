import { ListingModel } from '@/models/listings.model'

interface ListingCriteria {
  "address.market": string;
  property_type?: string;
  bedrooms?: number;
}

export const fetchAllListings = async (limit?: number) => {
  const query = ListingModel.find()
  if (limit) {
    query.limit(limit)
  }
  return await query.exec()
}

export const fetchListingById = async (id: string) => {
  return await ListingModel.findById(id)
}

export const searchListings = async (location: string, propertyType?: string, bedrooms?: number) => {
  const criteria: ListingCriteria = {
    "address.market": location,
  }
  if (propertyType) {
    criteria.property_type = propertyType
  }
  if (bedrooms !== undefined && !isNaN(bedrooms)) {
    criteria.bedrooms = bedrooms
  }
  return await ListingModel.find(criteria).exec()
}
