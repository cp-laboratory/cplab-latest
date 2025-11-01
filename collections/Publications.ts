import { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'journal', 'authors'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can read via API
      if (!user) return true
      
      // Professors can read all
      if (user.role === 'professor') return true
      
      // Students can only read their own publications
      if (user.role === 'student') {
        return {
          'authors.author': {
            equals: user.id,
          },
        }
      }
      
      return true
    },
    create: ({ req: { user } }) => {
      // Both professors and students can create publications
      if (!user) return false
      return user.role === 'professor' || user.role === 'student'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      
      // Professors can update all
      if (user.role === 'professor') return true
      
      // Students can only update their own publications
      if (user.role === 'student') {
        return {
          'authors.author': {
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
      
      // Students can only delete their own publications
      if (user.role === 'student') {
        return {
          'authors.author': {
            equals: user.id,
          },
        }
      }
      
      return false
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'abstract',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief abstract of the publication',
      },
    },
    {
      name: 'authors',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
    {
      name: 'journal',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the journal or conference',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        description: 'Year of publication',
      },
    },
    {
      name: 'doi',
      type: 'text',
      admin: {
        description: 'Digital Object Identifier (DOI)',
      },
    },
    {
      name: 'pdfUrl',
      type: 'text',
      admin: {
        description: 'URL to PDF version',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'External link to publication',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Cover image or graphical abstract',
      },
    },
    {
      name: 'citations',
      type: 'number',
      admin: {
        description: 'Number of citations',
      },
    },
  ],
}
