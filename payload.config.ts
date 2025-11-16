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
import { Projects } from './collections/Projects'
import { FAQ } from './collections/FAQ'
import { Notices } from './collections/Notices'
import { LabHighlights } from './collections/LabHighlights'
import { ResearchAreas } from './collections/ResearchAreas'
import { Notifications } from './collections/Notifications'
import { PushSubscriptions } from './collections/PushSubscriptions'
import { Certificates } from './collections/Certificates'
import { Profiles } from './collections/Profiles'
import { Recruitment } from './collections/Recruitment'

// Conditionally import Logo and Icon only in production
const Logo = process.env.NODE_ENV === 'production' ? require('./components/payload/Logo').default : undefined
const Icon = process.env.NODE_ENV === 'production' ? require('./components/payload/Icon').default : undefined

// Helper function to filter media based on user role
// This ensures students only see their own uploaded media when selecting files
export const mediaFilterOptions = ({ user }: { user: any }) => {
  if (!user) return false
  
  // Professors can see all media
  if (user.role === 'professor') return true
  
  // Students can only see their own uploads
  if (user.role === 'student') {
    return {
      uploadedBy: {
        equals: user.id,
      },
    }
  }
  
  return false
}

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Users, // Custom users collection with role-based access
    Profiles, // User profiles/portfolios (Students: own only, Professors: all)
    Recruitment, // Student recruitment applications (Professor only)
    News, // News articles
    Publications, // Research publications
    Projects, // Research and student projects
    FAQ, // Frequently Asked Questions (Admin only)
    Notices, // Notices/Announcements (Admin only)
    LabHighlights, // Lab Highlights statistics (Admin only)
    ResearchAreas, // Research Areas (Admin only)
    Notifications, // Push Notifications (Professor only)
    PushSubscriptions, // Push Subscription storage (Professor only)
    Certificates, // Certificates (Professor only)
    // Add your collections here
    // Media collection with Cloudflare R2 upload
    {
      slug: 'media',
      admin: {
        // Hide from students in the admin panel
        hidden: ({ user }) => {
          if (!user) return true
          return user.role !== 'professor'
        },
      },
      upload: {
        // staticDir is required even when using cloud storage
        // Files won't actually be saved here when disableLocalStorage is true
        staticDir: path.resolve(__dirname, 'media'),
        mimeTypes: ['image/*', 'video/*', 'application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-zip-compressed'],
        filesRequiredOnCreate: false,
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
      hooks: {
        beforeValidate: [
          ({ data, req }) => {
            // Validate file size (5MB limit)
            if (req.file && req.file.size) {
              const maxSize = 5 * 1024 * 1024 // 5MB in bytes
              if (req.file.size > maxSize) {
                throw new Error(`File size exceeds the 5MB limit. Your file is ${(req.file.size / 1024 / 1024).toFixed(2)}MB`)
              }
            }
            return data
          },
        ],
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
          required: true,
          admin: {
            position: 'sidebar',
            readOnly: true, // Make it read-only, cannot be edited
            description: 'User who uploaded this file',
            condition: () => false, // Hide from UI completely
          },
          hooks: {
            beforeChange: [
              ({ req }) => {
                // Always set to current user, ignore any manual input
                if (req.user) {
                  return req.user.id
                }
                return undefined
              },
            ],
          },
        },
      ],
      access: {
        read: () => true, // Everyone can view all media (needed for frontend display and publications)
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
      // MongoDB Atlas SSL/TLS configuration
      retryWrites: true,
      w: 'majority',
      // Increased timeouts for development stability
      serverSelectionTimeoutMS: 30000, // 30s instead of 10s
      socketTimeoutMS: 75000, // 75s instead of 45s
      connectTimeoutMS: 30000, // 30s connection timeout
      // Connection pool settings - more relaxed for development
      maxPoolSize: process.env.NODE_ENV === 'production' ? 10 : 5,
      minPoolSize: process.env.NODE_ENV === 'production' ? 2 : 1,
      maxIdleTimeMS: 120000, // 2 minutes instead of 1
      waitQueueTimeoutMS: 30000, // 30s instead of 10s
      family: 4,
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
    // Add link to homepage in admin panel
    components: {
      ...(process.env.NODE_ENV === 'production' && Logo && Icon ? {
        graphics: {
          Logo: Logo as any,
          Icon: Icon as any,
        },
      } : {}),
      // Add custom actions to navbar
      beforeNavLinks: [
        '/components/payload/BeforeNavLinks#BeforeNavLinks',
      ],
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
