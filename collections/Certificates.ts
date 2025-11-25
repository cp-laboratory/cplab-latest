import { CollectionConfig } from 'payload'

// Generate a random short code for certificate verification
const generateShortCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'certificateName',
    defaultColumns: ['certificateName', 'recipientUser', 'shortCode', 'issuedAt'],
    group: 'Administrative',
  },
  access: {
    // Professors can manage all certificates
    // Students can only read their own certificates
    read: ({ req: { user } }) => {
      if (!user) return false
      
      if (user.role === 'professor') return true
      
      if (user.role === 'student') {
        return {
          recipientUser: {
            equals: user.id,
          },
        }
      }
      
      return false
    },
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
  },
  fields: [
    {
      name: 'certificateName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name/Title of the certificate',
      },
    },
    {
      name: 'recipientUser',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'User who receives this certificate',
      },
    },
    {
      name: 'recipientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the recipient (can be different from username)',
      },
    },
    {
      name: 'certificateFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the certificate PDF/image file',
      },
    },
    {
      name: 'reason',
      type: 'richText',
      required: true,
      admin: {
        description: 'Reason for awarding this certificate (will be displayed publicly)',
      },
    },
    {
      name: 'achievement',
      type: 'text',
      admin: {
        description: 'Achievement or course name (e.g., "Web Development Bootcamp", "Best Research Paper")',
      },
    },
    {
      name: 'issuedBy',
      type: 'text',
      defaultValue: 'Cyber Physical Laboratory',
      admin: {
        description: 'Organization/Lab name issuing the certificate',
      },
    },
    {
      name: 'issuedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Date when the certificate was issued',
      },
    },
    {
      name: 'shortCode',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Unique verification code (auto-generated)',
        readOnly: true,
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this certificate is active and verifiable',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Tags for categorizing certificates',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Generate short code for new certificates
        if (operation === 'create' && !data.shortCode) {
          data.shortCode = generateShortCode()
        }
        return data
      },
    ],
  },
}
