import { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publicationType', 'year', 'authors', 'status'],
    group: 'Research',
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
    // Basic Information
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Full title of the publication',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., machine-learning-iot-2024)',
      },
    },
    
    // Publication Type
    {
      name: 'publicationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Journal Article', value: 'journal' },
        { label: 'Conference Paper', value: 'conference' },
        { label: 'Book Chapter', value: 'book-chapter' },
        { label: 'Technical Report', value: 'technical-report' },
        { label: 'Thesis/Dissertation', value: 'thesis' },
        { label: 'Preprint', value: 'preprint' },
        { label: 'Workshop Paper', value: 'workshop' },
        { label: 'Poster', value: 'poster' },
        { label: 'Patent', value: 'patent' },
        { label: 'White Paper', value: 'white-paper' },
        { label: 'Magazine Article', value: 'magazine' },
        { label: 'Book', value: 'book' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'journal',
      admin: {
        description: 'Select the type of publication',
      },
    },
    
    // Status
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Published', value: 'published' },
        { label: 'In Press', value: 'in-press' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Preprint', value: 'preprint' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'published',
      admin: {
        description: 'Current publication status',
      },
    },
    
    // Abstract & Description
    {
      name: 'abstract',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief abstract or summary of the publication (250-500 words)',
        rows: 6,
      },
    },
    {
      name: 'keywords',
      type: 'array',
      admin: {
        description: 'Research keywords/tags for better discoverability',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
    },
    
    // Authors & Contributors
    {
      name: 'authors',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add all authors in order (first author, second author, etc.)',
      },
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          admin: {
            description: 'Select author from lab members',
          },
        },
        {
          name: 'externalAuthor',
          type: 'text',
          admin: {
            description: 'For authors outside the lab (e.g., "John Doe, MIT")',
            condition: (data, siblingData) => !siblingData.author,
          },
        },
        {
          name: 'isCorresponding',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Mark if this is the corresponding author',
          },
        },
      ],
    },
    
    // Publication Details
    {
      name: 'venue',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Journal name, conference name, or publisher',
          },
        },
        {
          name: 'acronym',
          type: 'text',
          admin: {
            description: 'Acronym if applicable (e.g., "ICML", "IEEE IoT")',
          },
        },
        {
          name: 'volume',
          type: 'text',
          admin: {
            description: 'Volume number (for journals)',
          },
        },
        {
          name: 'issue',
          type: 'text',
          admin: {
            description: 'Issue number (for journals)',
          },
        },
        {
          name: 'pages',
          type: 'text',
          admin: {
            description: 'Page range (e.g., "123-145")',
          },
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'Conference location or publisher location',
          },
        },
      ],
    },
    
    // Date Information
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1900,
      max: 2100,
      admin: {
        description: 'Year of publication',
      },
    },
    {
      name: 'month',
      type: 'select',
      options: [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
      ],
      admin: {
        description: 'Month of publication (optional)',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        description: 'Exact publication date (optional)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    
    // Identifiers & Links
    {
      name: 'identifiers',
      type: 'group',
      fields: [
        {
          name: 'doi',
          type: 'text',
          admin: {
            description: 'Digital Object Identifier (e.g., 10.1234/example)',
          },
        },
        {
          name: 'isbn',
          type: 'text',
          admin: {
            description: 'ISBN for books',
          },
        },
        {
          name: 'issn',
          type: 'text',
          admin: {
            description: 'ISSN for journals',
          },
        },
        {
          name: 'arxivId',
          type: 'text',
          admin: {
            description: 'arXiv identifier (e.g., 2301.12345)',
          },
        },
        {
          name: 'pubmedId',
          type: 'text',
          admin: {
            description: 'PubMed ID (PMID)',
          },
        },
      ],
    },
    
    // External URLs
    {
      name: 'links',
      type: 'group',
      fields: [
        {
          name: 'publisher',
          type: 'text',
          admin: {
            description: 'Official publisher URL',
          },
        },
        {
          name: 'repository',
          type: 'text',
          admin: {
            description: 'Code repository (GitHub, GitLab, etc.)',
          },
        },
        {
          name: 'dataset',
          type: 'text',
          admin: {
            description: 'Dataset URL (Zenodo, Figshare, etc.)',
          },
        },
        {
          name: 'supplementary',
          type: 'text',
          admin: {
            description: 'Supplementary materials URL',
          },
        },
        {
          name: 'presentation',
          type: 'text',
          admin: {
            description: 'Presentation slides or video URL',
          },
        },
      ],
    },
    
    // File Uploads
    {
      name: 'files',
      type: 'array',
      admin: {
        description: 'Upload publication files (PDF, supplementary materials, etc.) - Max 5MB per file',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: {
              contains: 'pdf',
            },
          },
        },
        {
          name: 'fileType',
          type: 'select',
          required: true,
          options: [
            { label: 'Main Publication (PDF)', value: 'main' },
            { label: 'Supplementary Material', value: 'supplementary' },
            { label: 'Presentation Slides', value: 'slides' },
            { label: 'Poster', value: 'poster' },
            { label: 'Code/Dataset', value: 'data' },
            { label: 'Preprint Version', value: 'preprint' },
            { label: 'Author Accepted Manuscript', value: 'manuscript' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'main',
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Custom label for this file (e.g., "Technical Appendix")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Brief description of what this file contains',
            rows: 2,
          },
        },
      ],
    },
    
    // Additional Files (Images, Videos, etc.)
    {
      name: 'additionalMedia',
      type: 'array',
      admin: {
        description: 'Add images, videos, or other media files - Max 5MB per file',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Caption for this media item',
          },
        },
        {
          name: 'mediaType',
          type: 'select',
          required: true,
          options: [
            { label: 'Figure/Diagram', value: 'figure' },
            { label: 'Graph/Chart', value: 'graph' },
            { label: 'Video Demo', value: 'video' },
            { label: 'Screenshot', value: 'screenshot' },
            { label: 'Graphical Abstract', value: 'graphical-abstract' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'figure',
        },
      ],
    },
    
    // Featured Image
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Cover image or graphical abstract for showcase',
      },
    },
    
    // Metrics & Impact
    {
      name: 'metrics',
      type: 'group',
      admin: {
        description: 'Publication impact metrics (optional)',
      },
      fields: [
        {
          name: 'citations',
          type: 'number',
          min: 0,
          admin: {
            description: 'Number of citations (Google Scholar, Web of Science, etc.)',
          },
        },
        {
          name: 'impactFactor',
          type: 'number',
          admin: {
            description: 'Journal impact factor',
          },
        },
        {
          name: 'hIndex',
          type: 'number',
          admin: {
            description: 'h-index at time of publication',
          },
        },
        {
          name: 'downloads',
          type: 'number',
          admin: {
            description: 'Number of downloads',
          },
        },
      ],
    },
    
    // Research Categories
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
        { label: 'Human-Computer Interaction', value: 'hci' },
        { label: 'Software Engineering', value: 'software-eng' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Select all applicable research areas',
      },
    },
    
    // Awards & Recognition
    {
      name: 'awards',
      type: 'array',
      admin: {
        description: 'Awards or recognition received',
      },
      fields: [
        {
          name: 'awardName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of award (e.g., "Best Paper Award")',
          },
        },
        {
          name: 'awardingBody',
          type: 'text',
          admin: {
            description: 'Organization that gave the award',
          },
        },
        {
          name: 'year',
          type: 'number',
          admin: {
            description: 'Year received',
          },
        },
      ],
    },
    
    // Funding Information
    {
      name: 'funding',
      type: 'array',
      admin: {
        description: 'Funding sources and grant information',
      },
      fields: [
        {
          name: 'agency',
          type: 'text',
          required: true,
          admin: {
            description: 'Funding agency name',
          },
        },
        {
          name: 'grantNumber',
          type: 'text',
          admin: {
            description: 'Grant or award number',
          },
        },
        {
          name: 'amount',
          type: 'text',
          admin: {
            description: 'Funding amount (optional)',
          },
        },
      ],
    },
    
    // Featured & Visibility
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this publication on the homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'openAccess',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this an open access publication?',
        position: 'sidebar',
      },
    },
    {
      name: 'peerReviewed',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Was this peer-reviewed?',
        position: 'sidebar',
      },
    },
    
    // Notes
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
