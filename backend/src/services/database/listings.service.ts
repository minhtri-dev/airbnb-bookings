import { ListingModel } from '@/models/listings.model'

interface ListingCriteria {
  'address.market': string
  property_type?: string
  bedrooms?: number | { $gte: number }
}

export const fetchAllListings = async (limit = 10, page = 1) => {
  return await ListingModel.paginate({}, { limit, page })
}

export const fetchListingById = async (id: string) => {
  return await ListingModel.findById(id)
}

export const searchListings = async (
  location: string,
  property_type?: string,
  bedrooms?: number,
  page = 1,
  limit = 10,
) => {
  const criteria: ListingCriteria = {
    'address.market': location,
  }
  if (property_type) {
    criteria.property_type = property_type
  }
  if (bedrooms !== undefined && !isNaN(bedrooms)) {
    if (bedrooms === 4) {
      criteria.bedrooms = { $gte: 4 }
    } else {
      criteria.bedrooms = bedrooms
    }
  }
  return await ListingModel.paginate(criteria, { limit, page })
}
