import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'firstName', 'lastName'],
    // Hide Users collection from students in admin panel
    // Students can still manage their profile at /admin/account
    hidden: ({ user }) => user?.role === 'student',
  },
  access: {
    // Admins (professors) can read all users
    // Students can only read their own account
    read: ({ req: { user } }) => {
      if (!user) return false
      
      // Professors (admins) can see all users
      if (user.role === 'professor') {
        return true
      }
      
      // Students can only see themselves
      if (user.role === 'student') {
        return {
          id: {
            equals: user.id,
          },
        }
      }
      
      return false
    },
    
    // Only admins (professors) can create new users
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    
    // Admins can update anyone, students can only update themselves
    update: ({ req: { user } }) => {
      if (!user) return false
      
      // Professors can update anyone
      if (user.role === 'professor') {
        return true
      }
      
      // Students can only update themselves
      if (user.role === 'student') {
        return {
          id: {
            equals: user.id,
          },
        }
      }
      
      return false
    },
    
    // Only professors can delete users
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        {
          label: 'Professor (Admin)',
          value: 'professor',
        },
        {
          label: 'Student (Member)',
          value: 'student',
        },
      ],
      access: {
        // Only professors can change roles
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'professor'
        },
      },
      admin: {
        description: 'Professors have full admin access. Students can only manage their own account.',
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        description: 'First name of the user',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        description: 'Last name of the user',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Automatically generate full name
            return `${siblingData.firstName || ''} ${siblingData.lastName || ''}`.trim()
          },
        ],
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture',
      },
      filterOptions: ({ user }) => {
        const baseFilter = {
          mimeType: {
            contains: 'image',
          },
        }
        
        if (!user) return baseFilter
        
        // Professors see all media
        if (user.role === 'professor') return baseFilter
        
        // Students only see their own uploads
        if (user.role === 'student') {
          return {
            and: [
              baseFilter,
              {
                uploadedBy: {
                  equals: user.id,
                },
              },
            ],
          }
        }
        
        return baseFilter
      },
    },
    {
      name: 'department',
      type: 'text',
      admin: {
        description: 'Department or field of study',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Short biography or description',
      },
    },
    {
      name: 'researchInterests',
      type: 'textarea',
      admin: {
        description: 'Research interests and areas of expertise',
        condition: (data) => data.role === 'professor',
      },
    },
    {
      name: 'studentId',
      type: 'text',
      admin: {
        description: 'Student ID number',
        condition: (data) => data.role === 'student',
      },
    },
    {
      name: 'enrollmentYear',
      type: 'number',
      admin: {
        description: 'Year of enrollment',
        condition: (data) => data.role === 'student',
      },
    },
  ],
}
