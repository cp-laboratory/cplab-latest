import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    group: 'Administrative',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'isPublished'],
    description: 'Manage frequently asked questions displayed on the homepage',
    // Hide from students in the admin panel
    hidden: ({ user }) => {
      if (!user) return true
      return user.role !== 'professor'
    },
  },
  access: {
    // Only professors can create FAQs
    create: ({ req: { user } }) => {
      return user?.role === 'professor'
    },
    // Only professors can read FAQs in admin panel
    read: ({ req: { user } }) => {
      return user?.role === 'professor'
    },
    // Only professors can update FAQs
    update: ({ req: { user } }) => {
      return user?.role === 'professor'
    },
    // Only professors can delete FAQs
    delete: ({ req: { user } }) => {
      return user?.role === 'professor'
    },
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
      admin: {
        description: 'The FAQ question',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Answer',
      admin: {
        description: 'The detailed answer to the question',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Research', value: 'research' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Publications', value: 'publications' },
        { label: 'Projects', value: 'projects' },
        { label: 'Collaboration', value: 'collaboration' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Categorize the FAQ for better organization',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Published',
      admin: {
        description: 'Toggle to show/hide this FAQ on the website',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        description: 'Optional tags for additional categorization',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
