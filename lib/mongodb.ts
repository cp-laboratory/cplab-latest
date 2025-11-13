import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URI

if (!MONGODB_URI) {
  throw new Error('Please define the DATABASE_URI environment variable')
}

interface CachedConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Declare global mongoose connection for development hot reloading
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: CachedConnection = global.mongooseCache || { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Increased timeouts for development stability
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 75000,
      connectTimeoutMS: 30000,
      // Connection pool settings - more relaxed for development
      maxPoolSize: process.env.NODE_ENV === 'production' ? 10 : 5,
      minPoolSize: process.env.NODE_ENV === 'production' ? 2 : 1,
      maxIdleTimeMS: 120000,
      waitQueueTimeoutMS: 30000,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
