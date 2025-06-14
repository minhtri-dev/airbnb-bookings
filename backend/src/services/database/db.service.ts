import config from '@/config/db.config'
import mongoose from 'mongoose'

const { URI, DB_NAME } = config

export const connectDatabase = async (): Promise<void> => {
  try {
    if (URI) {
      await mongoose.connect(URI+DB_NAME)
      console.log(`Connected to MongoDB server using defined URI: ${URI+DB_NAME}`)
    } else {
      throw new Error(
        'No MongoDB URI defined. Please check environment variables.',
      )
    }
    return
  } catch (error) {
    console.error(
      `Error connecting to MongoDB: ${error instanceof Error ? error.message : error}`,
    )
    process.exit(1)
  }
}