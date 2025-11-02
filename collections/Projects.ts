import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectType', 'status', 'teamMembers', 'timeline'],
    group: 'Research',
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data, originalDoc }) => {
        // Only apply this check for students on update operations
        if (req.user && req.user.role === 'student' && operation === 'update') {
          // Get the document to check
          const docToCheck = originalDoc
          
          if (docToCheck && docToCheck.teamMembers) {
            // Check if current user is in the team members
            const userId = req.user.id.toString()
            const isTeamMember = docToCheck.teamMembers.some((member: any) => {
              return member?.member && member?.member?.toString() === userId
            })
            
            if (!isTeamMember) {
              throw new Error('Students can only modify projects they are team members of')
            }
          }
        }
        
        return data
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        // Only apply this check for students
        if (req.user && req.user.role === 'student') {
          // Fetch the project to check team members
          const project = await req.payload.findByID({
            collection: 'projects',
            id,
          })
          
          if (project && project.teamMembers) {
            const userId = req.user.id.toString()
            const isTeamMember = project.teamMembers.some((member: any) => {
              return member?.member && member?.member.toString() === userId
            })
            
            if (!isTeamMember) {
              throw new Error('Students can only delete projects they are team members of')
            }
          }
        }
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      // Professors can read all
      if (user?.role === 'professor') return true
      
      // Public and students: only published projects
      return {
        published: {
          equals: true,
        },
      }
    },
    create: ({ req: { user } }) => {
      // Both professors and students can create projects
      if (!user) return false
      return user.role === 'professor' || user.role === 'student'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      
      // Professors can update all
      if (user.role === 'professor') return true
      
      // Students can only update projects where they are team members
      // This requires custom hook validation since we can't use nested paths in access
      if (user.role === 'student') {
        return true // Allow access, will validate in beforeChange hook
      }
      
      return false
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      
      // Professors can delete all
      if (user.role === 'professor') return true
      
      // Students can only delete projects where they are team members
      // This requires custom hook validation
      if (user.role === 'student') {
        return true // Allow access, will validate in beforeChange hook
      }
      
      return false
    },
  },
  fields: [
    // Basic Information
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Project title or name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version (e.g., smart-home-iot-system)',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short catchy tagline (1 sentence)',
      },
    },
    
    // Project Type & Status
    {
      name: 'projectType',
      type: 'select',
      required: true,
      options: [
        { label: 'Research Project', value: 'research' },
        { label: 'Industry Collaboration', value: 'industry' },
        { label: 'Student Project', value: 'student' },
        { label: 'Open Source', value: 'open-source' },
        { label: 'Capstone/Final Year', value: 'capstone' },
        { label: 'Hackathon', value: 'hackathon' },
        { label: 'Competition', value: 'competition' },
        { label: 'Grant-Funded', value: 'grant' },
        { label: 'Prototype/PoC', value: 'prototype' },
        { label: 'Product Development', value: 'product' },
        { label: 'Thesis', value: 'thesis' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'research',
      admin: {
        description: 'Type of project',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on-hold' },
      ],
      defaultValue: 'in-progress',
      admin: {
        description: 'Current project status',
      },
    },
    
    // Description
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief project description (2-3 paragraphs)',
        rows: 6,
      },
    },
    {
      name: 'problem',
      type: 'textarea',
      admin: {
        description: 'What problem does this project solve?',
        rows: 4,
      },
    },
    {
      name: 'solution',
      type: 'textarea',
      admin: {
        description: 'How does your project solve it?',
        rows: 4,
      },
    },
    {
      name: 'impact',
      type: 'textarea',
      admin: {
        description: 'Expected or achieved impact',
        rows: 3,
      },
    },
    
    // Team Members
    {
      name: 'teamMembers',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Project team members',
      },
      fields: [
        {
          name: 'member',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'Lab member',
          },
        },
        {
          name: 'externalMember',
          type: 'text',
          admin: {
            description: 'External collaborator (e.g., "Jane Smith, ABC Corp")',
            condition: (data, siblingData) => !siblingData.member,
          },
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Project Lead', value: 'lead' },
            { label: 'Developer', value: 'developer' },
            { label: 'Researcher', value: 'researcher' },
            { label: 'Designer', value: 'designer' },
            { label: 'Data Scientist', value: 'data-scientist' },
            { label: 'Hardware Engineer', value: 'hardware' },
            { label: 'Advisor', value: 'advisor' },
            { label: 'Mentor', value: 'mentor' },
            { label: 'Contributor', value: 'contributor' },
          ],
          defaultValue: 'developer',
          admin: {
            description: 'Role in the project',
          },
        },
      ],
    },
    
    // Timeline
    {
      name: 'timeline',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            description: 'Project start date',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Project end date (if completed)',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'duration',
          type: 'text',
          admin: {
            description: 'Project duration (e.g., "6 months", "1 year")',
          },
        },
      ],
    },
    
    // Technologies & Tools
    {
      name: 'technologies',
      type: 'array',
      admin: {
        description: 'Technologies, frameworks, and tools used',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Technology name (e.g., React, Python, Arduino)',
          },
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Programming Language', value: 'language' },
            { label: 'Framework', value: 'framework' },
            { label: 'Library', value: 'library' },
            { label: 'Platform', value: 'platform' },
            { label: 'Hardware', value: 'hardware' },
            { label: 'Tool', value: 'tool' },
            { label: 'Database', value: 'database' },
            { label: 'Cloud Service', value: 'cloud' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'tool',
        },
      ],
    },
    
    // Research Areas
    {
      name: 'researchAreas',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Artificial Intelligence', value: 'ai' },
        { label: 'Machine Learning', value: 'ml' },
        { label: 'Deep Learning', value: 'deep-learning' },
        { label: 'Computer Vision', value: 'computer-vision' },
        { label: 'Natural Language Processing', value: 'nlp' },
        { label: 'Robotics', value: 'robotics' },
        { label: 'Internet of Things', value: 'iot' },
        { label: 'Embedded Systems', value: 'embedded' },
        { label: 'Cyber-Physical Systems', value: 'cps' },
        { label: 'Cybersecurity', value: 'security' },
        { label: 'Blockchain', value: 'blockchain' },
        { label: 'Cloud Computing', value: 'cloud' },
        { label: 'Edge Computing', value: 'edge' },
        { label: 'Wireless Networks', value: 'wireless' },
        { label: 'Data Science', value: 'data-science' },
        { label: 'Web Development', value: 'web-dev' },
        { label: 'Mobile Development', value: 'mobile-dev' },
        { label: 'Game Development', value: 'game-dev' },
        { label: 'Human-Computer Interaction', value: 'hci' },
        { label: 'Software Engineering', value: 'software-eng' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Select all applicable research/tech areas',
      },
    },
    
    // Tags/Keywords
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Project tags for filtering and search',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    
    // Links & Resources
    {
      name: 'links',
      type: 'group',
      fields: [
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub repository URL',
          },
        },
        {
          name: 'gitlab',
          type: 'text',
          admin: {
            description: 'GitLab repository URL',
          },
        },
        {
          name: 'bitbucket',
          type: 'text',
          admin: {
            description: 'Bitbucket repository URL',
          },
        },
        {
          name: 'live',
          type: 'text',
          admin: {
            description: 'Live demo/website URL',
          },
        },
        {
          name: 'documentation',
          type: 'text',
          admin: {
            description: 'Documentation URL',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            description: 'YouTube video ID only (e.g., "dQw4w9WgXcQ" from https://youtube.com/watch?v=dQw4w9WgXcQ)',
            placeholder: 'dQw4w9WgXcQ',
          },
        },
        {
          name: 'vimeo',
          type: 'text',
          admin: {
            description: 'Vimeo video URL',
          },
        },
        {
          name: 'reddit',
          type: 'text',
          admin: {
            description: 'Reddit discussion/post URL',
          },
        },
        {
          name: 'devpost',
          type: 'text',
          admin: {
            description: 'Devpost project URL',
          },
        },
        {
          name: 'hackerNews',
          type: 'text',
          admin: {
            description: 'Hacker News discussion URL',
          },
        },
        {
          name: 'productHunt',
          type: 'text',
          admin: {
            description: 'Product Hunt URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X thread or announcement',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn post or project page',
          },
        },
        {
          name: 'medium',
          type: 'text',
          admin: {
            description: 'Medium article/blog post',
          },
        },
        {
          name: 'devTo',
          type: 'text',
          admin: {
            description: 'Dev.to article URL',
          },
        },
        {
          name: 'other',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Link label (e.g., "Project Blog", "API Docs")',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                description: 'URL',
              },
            },
          ],
        },
      ],
    },
    
    // Images/Gallery (Max 5MB each)
    {
      name: 'images',
      type: 'array',
      admin: {
        description: 'Project screenshots, diagrams, photos - Max 5MB per image',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Image caption/description',
          },
        },
        {
          name: 'imageType',
          type: 'select',
          options: [
            { label: 'Screenshot', value: 'screenshot' },
            { label: 'System Architecture', value: 'architecture' },
            { label: 'UI/UX Design', value: 'design' },
            { label: 'Hardware Setup', value: 'hardware' },
            { label: 'Demo', value: 'demo' },
            { label: 'Diagram/Flowchart', value: 'diagram' },
            { label: 'Team Photo', value: 'team' },
            { label: 'Result/Output', value: 'result' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'screenshot',
        },
        {
          name: 'order',
          type: 'number',
          admin: {
            description: 'Display order (1, 2, 3...)',
          },
        },
      ],
    },
    
    // Featured/Cover Image
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main cover/featured image - Max 5MB',
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
    
    // Logo/Icon
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Project logo or icon - Max 5MB',
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
    
    // Files & Documents
    {
      name: 'documents',
      type: 'array',
      admin: {
        description: 'PDFs, documentation, reports - Max 5MB per file',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: ({ user }) => {
            if (!user) return true
            
            // Professors see all media
            if (user.role === 'professor') return true
            
            // Students only see their own uploads
            if (user.role === 'student') {
              return {
                uploadedBy: {
                  equals: user.id,
                },
              }
            }
            
            return true
          },
        },
        {
          name: 'documentType',
          type: 'select',
          required: true,
          options: [
            { label: 'Project Report', value: 'report' },
            { label: 'Technical Documentation', value: 'docs' },
            { label: 'User Manual', value: 'manual' },
            { label: 'Presentation', value: 'presentation' },
            { label: 'Poster', value: 'poster' },
            { label: 'Research Paper', value: 'paper' },
            { label: 'Proposal', value: 'proposal' },
            { label: 'Dataset', value: 'dataset' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'report',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Document title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Brief description of the document',
            rows: 2,
          },
        },
      ],
    },
    
    // Features
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Key features of the project',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Feature title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Feature description',
            rows: 3,
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name or emoji (optional)',
          },
        },
      ],
    },
    
    // Achievements & Outcomes
    {
      name: 'achievements',
      type: 'array',
      admin: {
        description: 'Awards, recognition, or milestones',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Achievement title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Details',
            rows: 2,
          },
        },
        {
          name: 'date',
          type: 'date',
          admin: {
            description: 'Date achieved',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Related link (certificate, announcement, etc.)',
          },
        },
      ],
    },
    
    // Challenges & Learnings
    {
      name: 'challenges',
      type: 'textarea',
      admin: {
        description: 'Challenges faced during the project',
        rows: 4,
      },
    },
    {
      name: 'learnings',
      type: 'textarea',
      admin: {
        description: 'Key learnings and takeaways',
        rows: 4,
      },
    },
    {
      name: 'futureWork',
      type: 'textarea',
      admin: {
        description: 'Future improvements or roadmap',
        rows: 4,
      },
    },
    
    // Metrics & Stats
    {
      name: 'metrics',
      type: 'group',
      admin: {
        description: 'Project metrics and statistics',
      },
      fields: [
        {
          name: 'stars',
          type: 'number',
          admin: {
            description: 'GitHub stars (if applicable)',
          },
        },
        {
          name: 'forks',
          type: 'number',
          admin: {
            description: 'GitHub forks',
          },
        },
        {
          name: 'contributors',
          type: 'number',
          admin: {
            description: 'Number of contributors',
          },
        },
        {
          name: 'downloads',
          type: 'number',
          admin: {
            description: 'Download count',
          },
        },
        {
          name: 'users',
          type: 'number',
          admin: {
            description: 'Active users (if applicable)',
          },
        },
        {
          name: 'views',
          type: 'number',
          admin: {
            description: 'Project page views',
          },
        },
      ],
    },
    
    // Funding
    {
      name: 'funding',
      type: 'array',
      admin: {
        description: 'Funding sources and grants',
      },
      fields: [
        {
          name: 'source',
          type: 'text',
          required: true,
          admin: {
            description: 'Funding source/organization',
          },
        },
        {
          name: 'amount',
          type: 'text',
          admin: {
            description: 'Funding amount',
          },
        },
        {
          name: 'grantNumber',
          type: 'text',
          admin: {
            description: 'Grant number',
          },
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Research Grant', value: 'grant' },
            { label: 'Industry Sponsorship', value: 'sponsorship' },
            { label: 'Competition Prize', value: 'prize' },
            { label: 'Crowdfunding', value: 'crowdfunding' },
            { label: 'Internal Funding', value: 'internal' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    
    // Related Publications
    {
      name: 'relatedPublications',
      type: 'relationship',
      relationTo: 'publications',
      hasMany: true,
      admin: {
        description: 'Related research papers or publications',
      },
    },
    
    // License
    {
      name: 'license',
      type: 'select',
      options: [
        { label: 'MIT License', value: 'mit' },
        { label: 'Apache 2.0', value: 'apache-2.0' },
        { label: 'GPL v3', value: 'gpl-3.0' },
        { label: 'BSD 3-Clause', value: 'bsd-3' },
        { label: 'Creative Commons', value: 'cc' },
        { label: 'Proprietary', value: 'proprietary' },
        { label: 'Other', value: 'other' },
        { label: 'None', value: 'none' },
      ],
      admin: {
        description: 'Project license (if open source)',
      },
    },
    
    // Visibility & Features
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Make this project visible on the public projects page',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this project on project page',
        position: 'sidebar',
      },
    },
    {
      name: 'openSource',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this an open source project?',
        position: 'sidebar',
      },
    },
    {
      name: 'lookingForCollaborators',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Looking for collaborators?',
        position: 'sidebar',
      },
    },
    {
      name: 'acceptingContributions',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Accepting external contributions?',
        position: 'sidebar',
      },
    },
    
    // Contact/Collaboration
    {
      name: 'contactEmail',
      type: 'email',
      admin: {
        description: 'Contact email for inquiries or collaboration',
        position: 'sidebar',
      },
    },
    
    // Internal Notes
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes (not shown publicly)',
        rows: 3,
      },
    },
  ],
}
