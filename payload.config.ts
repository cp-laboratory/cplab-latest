import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { Users } from './collections/Users'
import Logo from './components/payload/Logo'
import Icon from './components/payload/Icon'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Users, // Custom users collection with role-based access
    // Add your collections here
    // Example Media collection with upload enabled
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(__dirname, 'media'),
        mimeTypes: ['image/*', 'video/*', 'application/pdf'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
      access: {
        // Only professors can upload/manage media
        create: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'professor'
        },
        read: () => true, // Anyone can view media
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'professor'
        },
        delete: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'professor'
        },
      },
    },
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',

  // Whichever Database Adapter you're using should go here
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      // MongoDB Atlas SSL/TLS configuration for production (Vercel)
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      // Connection pool settings for serverless
      maxPoolSize: 10,
      minPoolSize: 1,
    },
  }),

  // Email configuration using SMTP (Resend)
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_EMAIL || 'noreply@cplab.com',
    defaultFromName: process.env.SMTP_FROM_NAME || 'CPLab',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: false, // Use TLS (STARTTLS)
    },
  }),

  // Plugins for storage and other features
  plugins: [
    // Cloudflare R2 Storage (S3-compatible)
    s3Storage({
      collections: {
        media: true, // Enable R2 storage for media collection
      },
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto', // Cloudflare R2 uses 'auto' region
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      },
    }),
  ],

  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  sharp,

  // Configure the admin panel
  admin: {
    // Customize the admin panel branding
    meta: {
      titleSuffix: '- CPLab CMS',
    },
    user: 'users',
    // Customize admin panel based on user role
    components: {
      graphics: {
        Logo: Logo as any,
        Icon: Icon as any,
      },
    },
  },

  // Configure TypeScript
  typescript: {
    outputFile: 'payload-types.ts',
  },

  // Configure GraphQL
  graphQL: {
    schemaOutputFile: 'generated-schema.graphql',
  },
})
