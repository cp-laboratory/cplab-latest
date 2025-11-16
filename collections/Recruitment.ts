import { CollectionConfig } from 'payload'

export const Recruitment: CollectionConfig = {
  slug: 'recruitment',
  admin: {
    useAsTitle: 'applicantName',
    defaultColumns: ['applicantName', 'department', 'level', 'semester', 'status', 'submittedAt'],
    group: 'Administrative',
    description: 'Student recruitment applications and information',
  },
  access: {
    // Only professors can read
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can create
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can update
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can delete
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
  },
  fields: [
    // Personal Information
    {
      name: 'personalInfo',
      type: 'group',
      fields: [
        {
          name: 'applicantName',
          type: 'text',
          required: true,
          admin: {
            description: 'Full name of the applicant',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          unique: true,
          admin: {
            description: 'Primary email address',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: {
            description: 'Contact phone number',
          },
        },
        {
          name: 'alternateEmail',
          type: 'email',
          admin: {
            description: 'Secondary email address',
          },
        },
        {
          name: 'dateOfBirth',
          type: 'date',
          admin: {
            description: 'Date of birth',
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

    // Academic Information
    {
      name: 'academicInfo',
      type: 'group',
      fields: [
        {
          name: 'department',
          type: 'select',
          required: true,
          options: [
            { label: 'Computer Science & Engineering', value: 'cse' },
            { label: 'Electrical & Electronics Engineering', value: 'eee' },
            { label: 'Mechanical Engineering', value: 'me' },
            { label: 'Civil Engineering', value: 'ce' },
            { label: 'Electronics & Communication Engineering', value: 'ece' },
            { label: 'Information Technology', value: 'it' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            description: 'Current department/major',
          },
        },
        {
          name: 'faculty',
          type: 'text',
          admin: {
            description: 'Faculty or college name',
          },
        },
        {
          name: 'university',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the university/institution',
          },
        },
        {
          name: 'level',
          type: 'select',
          required: true,
          options: [
            { label: 'Undergraduate (Bachelor)', value: 'undergraduate' },
            { label: 'Graduate (Master)', value: 'graduate' },
            { label: 'PhD', value: 'phd' },
            { label: 'Postdoctoral', value: 'postdoc' },
          ],
          admin: {
            description: 'Current academic level',
          },
        },
        {
          name: 'semester',
          type: 'number',
          admin: {
            description: 'Current semester/year',
          },
        },
        {
          name: 'cgpa',
          type: 'number',
          admin: {
            description: 'Current CGPA/GPA',
          },
        },
        {
          name: 'expectedGraduation',
          type: 'date',
          admin: {
            description: 'Expected graduation date',
          },
        },
      ],
    },

    // Research Interests
    {
      name: 'researchInterests',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Areas of research interest',
      },
      fields: [
        {
          name: 'area',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Brief description of interest in this area',
          },
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
            { label: 'Research Skills', value: 'research' },
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

    // Education History
    {
      name: 'education',
      type: 'array',
      admin: {
        description: 'Previous educational qualifications',
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
            description: 'Field of study',
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
      ],
    },

    // Publications
    {
      name: 'publications',
      type: 'array',
      admin: {
        description: 'Research publications',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'authors',
          type: 'text',
          admin: {
            description: 'List of authors (comma-separated)',
          },
        },
        {
          name: 'venue',
          type: 'text',
          admin: {
            description: 'Journal/Conference name',
          },
        },
        {
          name: 'year',
          type: 'number',
        },
        {
          name: 'publicationType',
          type: 'select',
          options: [
            { label: 'Journal Article', value: 'journal' },
            { label: 'Conference Paper', value: 'conference' },
            { label: 'Workshop Paper', value: 'workshop' },
            { label: 'Book Chapter', value: 'book_chapter' },
            { label: 'Technical Report', value: 'tech_report' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'doi',
          type: 'text',
          admin: {
            description: 'Digital Object Identifier',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Link to publication',
          },
        },
      ],
    },

    // Projects/Experience
    {
      name: 'projects',
      type: 'array',
      admin: {
        description: 'Research projects and work experience',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            description: 'Your role in the project',
          },
        },
        {
          name: 'organization',
          type: 'text',
          admin: {
            description: 'Company/Institution name',
          },
        },
        {
          name: 'startDate',
          type: 'date',
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Leave empty if ongoing',
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
        {
          name: 'technologies',
          type: 'text',
          admin: {
            description: 'Technologies used (comma-separated)',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Project URL or GitHub link',
          },
        },
      ],
    },

    // Social Media & Professional Links
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
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profile URL',
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
        },
        {
          name: 'resumeLink',
          type: 'text',
          admin: {
            description: 'External link to resume (Google Drive, Dropbox, etc.)',
          },
        },
      ],
    },

    // Additional Documents
    {
      name: 'additionalDocuments',
      type: 'array',
      admin: {
        description: 'Transcripts, certificates, recommendation letters, etc.',
      },
      fields: [
        {
          name: 'documentName',
          type: 'text',
          required: true,
        },
        {
          name: 'documentType',
          type: 'select',
          options: [
            { label: 'Transcript', value: 'transcript' },
            { label: 'Certificate', value: 'certificate' },
            { label: 'Recommendation Letter', value: 'recommendation' },
            { label: 'Cover Letter', value: 'cover_letter' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'External link to document',
          },
        },
      ],
    },

    // Statement of Purpose / Cover Letter
    {
      name: 'statementOfPurpose',
      type: 'richText',
      admin: {
        description: 'Why do you want to join this lab? What are your research goals?',
      },
    },

    // Availability
    {
      name: 'availability',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          admin: {
            description: 'When can you start?',
          },
        },
        {
          name: 'hoursPerWeek',
          type: 'number',
          admin: {
            description: 'How many hours per week can you commit?',
          },
        },
        {
          name: 'duration',
          type: 'select',
          options: [
            { label: '3-6 months', value: '3-6' },
            { label: '6-12 months', value: '6-12' },
            { label: '1-2 years', value: '1-2' },
            { label: '2+ years', value: '2+' },
            { label: 'Flexible', value: 'flexible' },
          ],
        },
      ],
    },

    // Application Status
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Under Review', value: 'reviewing' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Interview Scheduled', value: 'interview' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
      admin: {
        description: 'Current status of the application',
        position: 'sidebar',
      },
    },

    // Internal Notes (for professors)
    {
      name: 'internalNotes',
      type: 'richText',
      admin: {
        description: 'Internal notes and comments (not visible to applicant)',
        position: 'sidebar',
      },
    },

    // References
    {
      name: 'references',
      type: 'array',
      admin: {
        description: 'Academic or professional references',
      },
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
        {
          name: 'relationship',
          type: 'text',
          admin: {
            description: 'How do you know this person? (e.g., thesis advisor, professor)',
          },
        },
      ],
    },

    // Metadata
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        description: 'Date of application submission',
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'create' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        description: 'Last updated date',
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          () => {
            return new Date().toISOString()
          },
        ],
      },
    },
  ],
}
