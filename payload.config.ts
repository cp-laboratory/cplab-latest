import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    // Add your collections here
    // Example:
    // {
    //   slug: 'posts',
    //   fields: [
    //     {
    //       name: 'title',
    //       type: 'text',
    //       required: true,
    //     },
    //   ],
    // },
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',

  // Whichever Database Adapter you're using should go here
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  sharp,

  // Configure the admin panel
  admin: {
    // Customize the admin panel branding
    meta: {
      titleSuffix: '- CPLab CMS',
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
