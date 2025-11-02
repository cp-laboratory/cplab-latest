# Enhanced Publications Collection

## Overview
The Publications collection has been completely redesigned to be more sophisticated, flexible, and comprehensive for academic research showcasing.

## ✨ New Features

### 1. **Publication Types** (13 types)
- Journal Article
- Conference Paper
- Book Chapter
- Technical Report
- Thesis/Dissertation
- Preprint
- Workshop Paper
- Poster
- Patent
- White Paper
- Magazine Article
- Book
- Other

### 2. **Publication Status**
- Published
- In Press
- Under Review
- Preprint
- Draft

### 3. **Enhanced Author Management**
- **Lab Members**: Select from registered users
- **External Authors**: Add non-lab collaborators (e.g., "John Doe, MIT")
- **Corresponding Author**: Mark corresponding author(s)
- **Author Order**: Maintain proper author sequence

### 4. **Comprehensive Venue Information**
- Name (journal/conference)
- Acronym (e.g., ICML, IEEE IoT)
- Volume & Issue numbers
- Page range
- Location (for conferences)

### 5. **Date Fields**
- Year (required)
- Month (optional)
- Exact publication date (optional)

### 6. **Multiple Identifiers**
- DOI (Digital Object Identifier)
- ISBN (for books)
- ISSN (for journals)
- arXiv ID
- PubMed ID

### 7. **External Links**
- Publisher URL
- Code Repository (GitHub, GitLab)
- Dataset URL (Zenodo, Figshare)
- Supplementary Materials
- Presentation/Video

### 8. **File Uploads** (Max 5MB per file)
Upload multiple files with types:
- Main Publication (PDF)
- Supplementary Material
- Presentation Slides
- Poster
- Code/Dataset
- Preprint Version
- Author Accepted Manuscript
- Other

**Supported formats**:
- PDF
- Images (PNG, JPG, etc.)
- Videos
- PowerPoint (.ppt, .pptx)
- Word (.doc, .docx)
- ZIP archives

### 9. **Additional Media**
Upload and showcase:
- Figures/Diagrams
- Graphs/Charts
- Video Demos
- Screenshots
- Graphical Abstracts

### 10. **Keywords/Tags**
Add research keywords for better discoverability and search

### 11. **Research Areas** (18 categories)
- Artificial Intelligence
- Machine Learning
- Deep Learning
- Computer Vision
- Natural Language Processing
- Robotics
- Internet of Things
- Embedded Systems
- Cyber-Physical Systems
- Cybersecurity
- Blockchain
- Cloud Computing
- Edge Computing
- Wireless Networks
- Data Science
- Human-Computer Interaction
- Software Engineering
- Other

### 12. **Impact Metrics**
Track publication impact:
- Citation count
- Impact Factor
- h-Index
- Download count

### 13. **Awards & Recognition**
Document awards received:
- Award name
- Awarding organization
- Year received

### 14. **Funding Information**
Track research funding:
- Funding agency
- Grant number
- Funding amount

### 15. **Visibility Options**
- **Featured**: Showcase on homepage
- **Open Access**: Mark OA publications
- **Peer Reviewed**: Indicate peer review status

## 🔐 Access Control

### Students
- ✅ Can create publications
- ✅ Can edit **only their own** publications (where they are listed as an author)
- ✅ Can delete **only their own** publications
- ✅ Can view **only their own** publications in admin
- ✅ Can upload files (max 5MB each)

### Professors
- ✅ Can create publications
- ✅ Can edit **ALL** publications
- ✅ Can delete **ALL** publications
- ✅ Can view **ALL** publications
- ✅ Can upload files (max 5MB each)

### Public
- ✅ Can view published publications via API/frontend
- ❌ Cannot access admin panel

## 📁 File Management

### File Size Limit
- **Maximum**: 5MB per file
- **Validation**: Automatic rejection with clear error message
- **Error Example**: "File size exceeds the 5MB limit. Your file is 7.25MB"

### Supported File Types
**Documents**:
- PDF
- Word (.doc, .docx)
- PowerPoint (.ppt, .pptx)

**Media**:
- Images (jpg, png, gif, svg, webp)
- Videos (mp4, webm, mov)

**Archives**:
- ZIP files

### Storage
- All files uploaded to **Cloudflare R2** (cloud storage)
- Students can only see/select their own uploaded files
- Professors can see/select all files

## 🎯 Use Cases

### Example 1: Journal Article
```
Title: "Deep Learning for IoT Security"
Type: Journal Article
Status: Published
Venue: IEEE Internet of Things Journal
Volume: 10, Issue: 5
Pages: 123-145
Year: 2024
DOI: 10.1109/example
Authors: [Student A, Professor B, External: "John Doe, MIT"]
Files: Main PDF, Supplementary Materials, Dataset Link
Research Areas: Machine Learning, IoT, Cybersecurity
```

### Example 2: Conference Paper with Award
```
Title: "Novel Blockchain Consensus Mechanism"
Type: Conference Paper
Status: Published
Venue: International Conference on Blockchain (ICB 2024)
Location: New York, USA
Year: 2024, Month: June
Files: Paper PDF, Presentation Slides, Poster
Awards: "Best Paper Award, ICB 2024"
Code Repository: https://github.com/cplab/consensus
Research Areas: Blockchain, Distributed Systems
```

### Example 3: Thesis
```
Title: "Machine Learning in Edge Computing"
Type: Thesis/Dissertation
Status: Published
Venue: University Library
Year: 2024
Files: Full Thesis PDF, Defense Slides
Keywords: Edge Computing, ML, Optimization
Funding: NSF Grant #12345
```

## 📊 Admin Interface Improvements

### Default Columns
- Title
- Publication Type
- Year
- Authors
- Status

### Grouping
- All publication-related collections grouped under "Research"

### Organization
Fields are logically grouped:
1. Basic Information
2. Publication Type & Status
3. Abstract & Keywords
4. Authors & Contributors
5. Venue Details
6. Dates
7. Identifiers
8. Links
9. Files
10. Media
11. Metrics
12. Research Areas
13. Awards
14. Funding
15. Visibility Settings

## 🚀 Migration Notes

### From Old Schema
Old fields are compatible:
- `title` → Same
- `slug` → Same
- `abstract` → Same
- `authors` → Enhanced (now supports external authors)
- `journal` → Moved to `venue.name`
- `year` → Same
- `doi` → Moved to `identifiers.doi`
- `pdfUrl` → Use `files` array instead
- `externalUrl` → Use `links.publisher`
- `featuredImage` → Same
- `citations` → Moved to `metrics.citations`

### New Required Fields
Only these are required:
- title
- slug
- publicationType
- status
- abstract
- authors (at least one)
- venue.name
- year

All other fields are optional for flexibility.

## 💡 Best Practices

1. **Always add keywords**: Improves searchability
2. **Select research areas**: Helps categorization
3. **Upload main PDF**: Essential for showcase
4. **Add DOI when available**: Increases credibility
5. **Include links**: Code repos and datasets increase impact
6. **Mark corresponding author**: Important for contact
7. **Add featured image**: Better visual presentation
8. **Track metrics**: Update citation counts periodically
9. **Use appropriate file types**: Main for PDF, Supplementary for extras
10. **Write good abstracts**: 250-500 words is ideal

## 🔧 Technical Implementation

### Access Control Logic
```typescript
// Students can only edit their own
if (user.role === 'student') {
  return {
    'authors.author': {
      equals: user.id,
    },
  }
}

// Professors can edit all
if (user.role === 'professor') return true
```

### File Size Validation
```typescript
hooks: {
  beforeValidate: [
    ({ req }) => {
      if (req.file?.size > 5 * 1024 * 1024) {
        throw new Error('File exceeds 5MB limit')
      }
    },
  ],
}
```

## 🎨 Frontend Display Ideas

### Publication Card
```tsx
<PublicationCard
  title={pub.title}
  type={pub.publicationType}
  authors={pub.authors}
  venue={pub.venue.name}
  year={pub.year}
  image={pub.featuredImage}
  status={pub.status}
  openAccess={pub.openAccess}
  citations={pub.metrics.citations}
  pdfUrl={pub.files.find(f => f.fileType === 'main')}
/>
```

### Filter Options
- By publication type
- By research area
- By year range
- By author
- By status
- Featured only
- Open access only

---

**The Publications collection is now enterprise-grade and ready for comprehensive research showcasing! 🎓🚀**
