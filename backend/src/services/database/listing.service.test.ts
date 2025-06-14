import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { promises as fs } from 'fs'
import path from 'path'
import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest'
import { fetchAllListings, fetchListingById, searchListings } from './listing.service'
import { ListingModel } from '@/models/listings.model'

// A JSON reviver to convert MongoDB Extended JSON objects to native JS types.
function reviver(key: string, value: any) {
  if (value && typeof value === 'object') {
    if ('$date' in value) {
      if (value.$date && typeof value.$date === 'object' && '$numberLong' in value.$date) {
        return new Date(parseInt(value.$date.$numberLong, 10))
      }
      return new Date(value.$date)
    }
    if ('$numberInt' in value) {
      return parseInt(value.$numberInt, 10)
    }
    if ('$numberDouble' in value) {
      return parseFloat(value.$numberDouble)
    }
    if ('$numberDecimal' in value) {
      return parseFloat(value.$numberDecimal)
    }
  }
  return value
}

let mongoServer: MongoMemoryServer

describe('Listing Service Tests', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    // Clear the database before each test.
    await ListingModel.deleteMany({})

    const dataPath = path.join(__dirname, '../../../tests/fixtures/listings.json')
    const fileData = await fs.readFile(dataPath, 'utf-8')
    const listings = JSON.parse(fileData, reviver)
    // Insert data into in-memory database
    await ListingModel.insertMany(listings)
  })

  it('should fetch all listings with limit', async () => {
    const result = await fetchAllListings(1) // result will be paginate result object
    expect(result.docs.length).toBe(1)
  })

  it('should fetch listing by id', async () => {
    const listing = await fetchListingById("10006546")
    expect(listing).toBeDefined()
    expect(listing?.name).toBe("Ribeira Charming Duplex")
  })

  it('should search listings based on location', async () => {
    const result = await searchListings("Porto")
    expect(result.docs.length).toBeGreaterThan(0)
    result.docs.forEach((listing) => {
      expect(listing.address?.market).toBe("Porto")
    })
  })

  it('should search listings based on location, propertyType, and bedrooms', async () => {
    const result = await searchListings("Porto", "House", 3)
    const listing = result.docs[0]
    expect(listing?.name).toBe("Ribeira Charming Duplex")
    expect(listing?.property_type).toBe("House")
    expect(listing?.bedrooms).toBe(3)
  })
})