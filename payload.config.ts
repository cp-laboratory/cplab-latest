import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { Users } from './collections/Users'
import { News } from './collections/News'
import { Publications } from './collections/Publications'
import Logo from './components/payload/Logo'
import Icon from './components/payload/Icon'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Users, // Custom users collection with role-based access
    News, // News articles
    Publications, // Research publications
    // Add your collections here
    // Media collection with Cloudflare R2 upload
    {
      slug: 'media',
      upload: {
        // staticDir is required even when using cloud storage
        // Files won't actually be saved here when disableLocalStorage is true
        staticDir: path.resolve(__dirname, 'media'),
        mimeTypes: ['image/*', 'video/*', 'application/pdf'],
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
            height: undefined,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'uploadedBy',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            position: 'sidebar',
            description: 'User who uploaded this file',
          },
          hooks: {
            beforeChange: [
              ({ req, value }) => {
                // Automatically set uploadedBy to current user
                if (req.user && !value) {
                  return req.user.id
                }
                return value
              },
            ],
          },
        },
      ],
      access: {
        read: () => true, // Anyone can view media
        create: ({ req: { user } }) => {
          // Both professors and students can upload
          if (!user) return false
          return user.role === 'professor' || user.role === 'student'
        },
        update: ({ req: { user } }) => {
          if (!user) return false
          
          // Professors can update all
          if (user.role === 'professor') return true
          
          // Students can only update their own uploads
          if (user.role === 'student') {
            return {
              uploadedBy: {
                equals: user.id,
              },
            }
          }
          
          return false
        },
        delete: ({ req: { user } }) => {
          if (!user) return false
          
          // Professors can delete all
          if (user.role === 'professor') return true
          
          // Students can only delete their own uploads
          if (user.role === 'student') {
            return {
              uploadedBy: {
                equals: user.id,
              },
            }
          }
          
          return false
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
    // SEO Plugin
    seoPlugin({
      collections: ['news', 'publications'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `CPLab - ${doc?.title || 'Untitled'}`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.abstract || '',
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/${collectionSlug}/${doc?.slug}`
      },
    }),
    // Cloudflare R2 Storage (S3-compatible)
    s3Storage({
      collections: {
        media: {
          // Disable local storage, use R2 only
          disableLocalStorage: true,
          // Set the public URL for accessing files
          prefix: 'media',
          // Generate public URLs using your custom domain
          generateFileURL: ({ filename, prefix }) => {
            const publicURL = process.env.R2_PUBLIC_URL || ''
            return `${publicURL}/${prefix}/${filename}`
          },
        },
      },
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto', // Cloudflare R2 uses 'auto' region
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        forcePathStyle: true, // Required for R2
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
