import { CollectionConfig } from 'payload'

export const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'isPublished'],
    group: 'Administrative',
    // Hide from students - only professors can access
    hidden: ({ user }) => {
      if (!user) return true
      return user.role !== 'professor'
    },
  },
  access: {
    // Only professors can read notices in admin panel
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can create notices
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can update notices
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can delete notices
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main heading of the notice',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of the notice',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the notice (used for sorting and grouping)',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM dd, yyyy',
        },
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional link to more details (e.g., /news/article-slug)',
        placeholder: '/news/article-slug',
      },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional PDF file attachment',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Only published notices will be shown on the homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first (within the same date)',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Ensure date is set
        if (!data.date) {
          data.date = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
