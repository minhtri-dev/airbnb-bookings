import dotenv from 'dotenv'

dotenv.config()

interface dbConfig {
  URI: string | undefined
  DB_NAME: string | undefined
}

const dbConfig: dbConfig = {
  URI: process.env.MONGO_URI || undefined,
  DB_NAME: process.env.MONGO_NAME || 'sample_airbnb',
}

export default dbConfig
