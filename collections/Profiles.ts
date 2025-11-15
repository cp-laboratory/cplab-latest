import { CollectionConfig } from 'payload'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['personalInfo.fullName', 'personalInfo.memberType', 'user', 'personalInfo.designation', 'showPublic'],
    group: 'Content',
  },
  access: {
    // Everyone can read published profiles (for public viewing)
    // Professors can see all profiles
    // Students can only see their own profile
    read: ({ req: { user } }): any => {
      if (!user) {
        // Public can only see profiles with showPublic = true
        return {
          showPublic: {
            equals: true,
          },
        }
      }

      // Professors can see all profiles
      if (user.role === 'professor') {
        return true
      }

      // Students can only see their own profile or public ones
      if (user.role === 'student') {
        return {
          or: [
            {
              user: {
                equals: user.id,
              },
            },
            {
              showPublic: {
                equals: true,
              },
            },
          ],
        }
      }

      return {
        showPublic: {
          equals: true,
        },
      }
    },

    // Professors can create any profile
    // Students can only create their own profile (enforced in beforeChange hook)
    create: ({ req: { user } }) => {
      if (!user) return false
      // Both professors and students can create profiles
      return true
    },

    // Professors can update any profile
    // Students can only update their own profile
    update: ({ req: { user } }) => {
      if (!user) return false

      // Professors can update any profile
      if (user.role === 'professor') {
        return true
      }

      // Students can only update their own profile
      if (user.role === 'student') {
        return {
          user: {
            equals: user.id,
          },
        }
      }

      return false
    },

    // Only professors can delete profiles
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // For students creating a profile, force the user field to be themselves
        if (operation === 'create' && req.user && req.user.role === 'student') {
          data.user = req.user.id
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Automatically set displayName from personalInfo.fullName
            return siblingData?.personalInfo?.fullName || 'Unnamed Profile'
          },
        ],
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      admin: {
        description: 'User account linked to this profile',
      },
      access: {
        // Students cannot modify the user field
        update: ({ req }) => {
          return req.user?.role === 'professor'
        },
      },
    },

    // Personal Information
    {
      name: 'personalInfo',
      type: 'group',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          admin: {
            description: 'Full name of the person',
          },
        },
        {
          name: 'memberType',
          type: 'select',
          required: true,
          defaultValue: 'student',
          options: [
            { label: 'Professor', value: 'professor' },
            { label: 'Current Student', value: 'student' },
            { label: 'Alumni', value: 'alumni' },
            { label: 'Research Scholar', value: 'scholar' },
          ],
          admin: {
            description: 'Type of team member',
          },
        },
        {
          name: 'designation',
          type: 'text',
          admin: {
            description: 'Current designation/position (e.g., Professor, Student, Research Scholar)',
          },
        },
        {
          name: 'profileImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Profile photo',
          },
          // Students can only select their own uploaded images
          filterOptions: ({ user }) => {
            if (user?.role === 'student') {
              return {
                'uploadedBy': {
                  equals: user.id,
                },
              }
            }
            return true
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          admin: {
            description: 'Short bio or introduction',
          },
        },
        {
          name: 'about',
          type: 'richText',
          admin: {
            description: 'Detailed information about the person',
          },
        },
        {
          name: 'dateOfBirth',
          type: 'date',
          admin: {
            description: 'Date of birth (optional)',
          },
        },
        {
          name: 'gender',
          type: 'select',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
            { label: 'Prefer not to say', value: 'not_specified' },
          ],
        },
        {
          name: 'nationality',
          type: 'text',
        },
      ],
    },

    // Contact Information
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'alternateEmail',
          type: 'email',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'zipCode',
          type: 'text',
        },
      ],
    },

    // Social Media Links
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub profile URL',
          },
        },
        {
          name: 'googleScholar',
          type: 'text',
          admin: {
            description: 'Google Scholar profile URL',
          },
        },
        {
          name: 'researchGate',
          type: 'text',
          admin: {
            description: 'ResearchGate profile URL',
          },
        },
        {
          name: 'orcid',
          type: 'text',
          admin: {
            description: 'ORCID profile URL',
          },
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Personal website URL',
          },
        },
      ],
    },

    // Education
    {
      name: 'education',
      type: 'array',
      admin: {
        description: 'Educational qualifications',
      },
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          admin: {
            description: 'Degree name (e.g., B.Tech, M.Tech, PhD)',
          },
        },
        {
          name: 'field',
          type: 'text',
          required: true,
          admin: {
            description: 'Field of study (e.g., Computer Science)',
          },
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the institution',
          },
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'startYear',
          type: 'number',
          required: true,
        },
        {
          name: 'endYear',
          type: 'number',
          admin: {
            description: 'Leave empty if currently pursuing',
          },
        },
        {
          name: 'grade',
          type: 'text',
          admin: {
            description: 'GPA/CGPA/Percentage',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // Experience
    {
      name: 'experience',
      type: 'array',
      admin: {
        description: 'Work experience and positions held',
      },
      fields: [
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'organization',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Leave empty if currently working',
          },
        },
        {
          name: 'isCurrent',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'description',
          type: 'richText',
        },
      ],
    },

    // Skills
    {
      name: 'skills',
      type: 'array',
      admin: {
        description: 'Technical and soft skills',
      },
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Programming Languages', value: 'programming' },
            { label: 'Frameworks & Libraries', value: 'frameworks' },
            { label: 'Tools & Technologies', value: 'tools' },
            { label: 'Soft Skills', value: 'soft_skills' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'proficiency',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'Expert', value: 'expert' },
          ],
        },
      ],
    },

    // Research Interests
    {
      name: 'researchInterests',
      type: 'array',
      fields: [
        {
          name: 'area',
          type: 'text',
          required: true,
        },
      ],
    },

    // Publications (Relationship)
    {
      name: 'publications',
      type: 'relationship',
      relationTo: 'publications',
      hasMany: true,
      admin: {
        description: 'Select publications authored by this person',
      },
      // Students can only select their own publications
      filterOptions: ({ user }) => {
        if (user?.role === 'student') {
          return {
            'createdBy': {
              equals: user.id,
            },
          }
        }
        return true
      },
    },

    // Projects (Relationship)
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Select projects associated with this person',
      },
      // Students can only select their own projects
      filterOptions: ({ user }) => {
        if (user?.role === 'student') {
          return {
            'createdBy': {
              equals: user.id,
            },
          }
        }
        return true
      },
    },

    // Certificates (Relationship)
    {
      name: 'certificatesReceived',
      type: 'relationship',
      relationTo: 'certificates',
      hasMany: true,
      admin: {
        description: 'Certificates received by this person',
      },
      // Students can only select certificates assigned to them
      filterOptions: ({ user }) => {
        if (user?.role === 'student') {
          return {
            'recipientUser': {
              equals: user.id,
            },
          }
        }
        return true
      },
    },

    // Achievements
    {
      name: 'achievements',
      type: 'array',
      admin: {
        description: 'Awards, honors, and other achievements',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
          admin: {
            description: 'Organization or entity that gave the award',
          },
        },
        {
          name: 'date',
          type: 'date',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'certificateFile',
          type: 'upload',
          relationTo: 'media',
          // Students can only select their own files
          filterOptions: ({ user }) => {
            if (user?.role === 'student') {
              return {
                'uploadedBy': {
                  equals: user.id,
                },
              }
            }
            return true
          },
        },
      ],
    },

    // Resume/CV
    {
      name: 'resume',
      type: 'group',
      fields: [
        {
          name: 'resumeFile',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload resume/CV (PDF format recommended)',
          },
          // Students can only select their own files
          filterOptions: ({ user }) => {
            if (user?.role === 'student') {
              return {
                'uploadedBy': {
                  equals: user.id,
                },
              }
            }
            return true
          },
        },
        {
          name: 'resumeLink',
          type: 'text',
          admin: {
            description: 'External link to resume (Google Drive, Dropbox, etc.)',
          },
        },
        {
          name: 'lastUpdated',
          type: 'date',
          admin: {
            description: 'When was the resume last updated',
          },
        },
      ],
    },

    // Additional Information
    {
      name: 'additionalInfo',
      type: 'group',
      fields: [
        {
          name: 'languages',
          type: 'array',
          fields: [
            {
              name: 'language',
              type: 'text',
              required: true,
            },
            {
              name: 'proficiency',
              type: 'select',
              options: [
                { label: 'Native', value: 'native' },
                { label: 'Fluent', value: 'fluent' },
                { label: 'Professional', value: 'professional' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Basic', value: 'basic' },
              ],
            },
          ],
        },
        {
          name: 'hobbies',
          type: 'array',
          fields: [
            {
              name: 'hobby',
              type: 'text',
            },
          ],
        },
        {
          name: 'references',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'designation',
              type: 'text',
            },
            {
              name: 'organization',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'phone',
              type: 'text',
            },
          ],
        },
      ],
    },

    // Meta Information
    {
      name: 'showPublic',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this profile on public team page',
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order for display on team page (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'URL-friendly identifier for the profile',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (!value && data?.personalInfo?.fullName) {
              // Auto-generate slug from full name
              return data.personalInfo.fullName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'profileViews',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Number of times this profile has been viewed',
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
