# Cyber Physical Laboratory (CPLAB) Website

A modern, feature-rich research laboratory website built with Next.js 15, Payload CMS 3, and TypeScript. This platform serves as a comprehensive digital presence for the Cyber Physical Laboratory, showcasing research publications, projects, team members, and lab activities.

## 🌟 Features

### Frontend Application

- **Modern UI/UX**: Built with Next.js 15, Tailwind CSS, and Framer Motion animations
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Dark Mode Support**: Automatic theme switching with system preference detection
- **Progressive Web App (PWA)**: Installable web app with offline support
- **Push Notifications**: Real-time updates for lab announcements and news

### Core Pages

#### 🏠 Homepage

- Dynamic hero section with lab introduction
- Research areas showcase
- Latest news and announcements
- Lab highlights and statistics
- Professor profiles section
- Recruitment banner
- Newsletter subscription
- FAQ section

#### 👥 Team

- **Team Listing**: Grid view of all lab members with filters by member type
- **Team Detail Pages**: Individual profile pages with:
  - Personal information and bio
  - Education and experience
  - Research interests and expertise
  - Publications with sorting (by year/title)
  - Projects participation
  - Certificates and awards
  - Social media links
  - Contact information

#### 📚 Publications

- **Publications Listing**: Comprehensive list with advanced filtering
  - Search by title, author, keywords, or abstract
  - Filter by publication type (Journal, Conference, Book Chapter, etc.)
  - Filter by year
  - Pagination support
- **Publication Detail Pages**: Beautiful, professional layout featuring:
  - Complete publication metadata
  - Clickable author links (internal team members → profile, external → custom link)
  - Abstract and keywords
  - Venue information
  - DOI and identifier links
  - Metrics (citations, downloads, impact factor)
  - Awards and recognition
  - Featured image display
  - Share functionality

#### 🔬 Projects

- **Projects Listing**: Showcase of research and student projects
  - Filter by project type, status, and research areas
  - Search functionality
  - Featured projects highlighting
- **Project Detail Pages**: Comprehensive project information:
  - Project overview and timeline
  - Problem, solution, and impact sections
  - Team members with roles
  - Technologies and tools used
  - Key features
  - Project links (GitHub, live demo, documentation)
  - Embedded YouTube videos
  - Image galleries
  - Achievements and milestones
  - Challenges and learnings
  - Funding information
  - Related publications
  - Downloadable documents

#### 📰 News & Updates

- Latest lab news and articles
- News detail pages with rich content
- Featured image support

#### 📞 Contact

- Contact information and form
- Lab location details
- Social media links

#### 💼 Recruitment

- Multi-step application form with validation
  - Personal information
  - Academic background
  - Research interests
  - Project proposals with Lexical editor
  - Resume/CV upload
  - Statement of Purpose
- Client and server-side validation
- Progress tracking through steps

#### 🎓 Certificate Verification

- Verify lab-issued certificates by ID
- QR code generation for certificates
- Downloadable certificate PDFs

### Admin Dashboard (Payload CMS)

#### Role-Based Access Control (RBAC)

##### **Professor Role (Admin)**

- Full access to all collections and features
- Can create, read, update, and delete all content
- Media upload capabilities
- User management
- System configuration

##### **Student Role (Member)**

- Limited access to own content
- Can create and manage own:
  - Profile/Portfolio
  - Publications (where they are authors)
  - Projects (where they are team members)
- Read-only access to published content
- Cannot access administrative features

#### Content Collections

1. **Users**: User management with professor/student roles
2. **Profiles**: Detailed member portfolios with education, experience, publications, and projects
3. **Publications**: Research papers with:
   - Flexible author system (internal lab members or external authors with custom links)
   - Rich metadata (DOI, ISBN, arXiv, PubMed IDs)
   - Venue information
   - Keywords and tags
   - Files and supplementary materials
   - Metrics tracking
   - Awards and funding
4. **Projects**: Comprehensive project management
5. **News**: News articles and announcements
6. **Recruitment**: Student application submissions
7. **Certificates**: Certificate generation and management
8. **Notifications**: Push notification system
9. **FAQ**: Frequently asked questions (Admin only)
10. **Notices**: General notices (Admin only)
11. **Lab Highlights**: Homepage statistics (Admin only)
12. **Research Areas**: Research focus areas (Admin only)

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React, Tabler Icons
- **Forms**: React Hook Form with Zod validation
- **Rich Text**: Lexical Editor
- **State Management**: React Context API

### Backend & CMS

- **CMS**: Payload CMS 3.x
- **Database**: MongoDB (via Mongoose adapter)
- **Storage**: AWS S3 compatible (Cloudflare R2)
- **Email**: Nodemailer
- **Authentication**: Payload built-in auth with JWT

### Additional Features

- **SEO**: Payload SEO plugin
- **PWA**: Service Worker with offline support
- **Analytics**: Vercel Analytics & Speed Insights
- **PDF Generation**: jsPDF, html2canvas
- **Image Processing**: Sharp

## 📁 Project Structure

```bash
cplab-latest/
├── app/
│   ├── (frontend)/           # Public-facing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── team/             # Team pages
│   │   │   ├── page.tsx      # Team listing
│   │   │   └── [id]/         # Individual profiles
│   │   ├── publications/     # Publications
│   │   │   ├── page.tsx      # Publications listing
│   │   │   └── [slug]/       # Publication details
│   │   ├── projects/         # Projects
│   │   │   ├── page.tsx      # Projects listing
│   │   │   └── [id]/         # Project details
│   │   ├── news/             # News pages
│   │   ├── recruitment/      # Recruitment application
│   │   ├── certificate/      # Certificate verification
│   │   ├── contact/          # Contact page
│   │   ├── developer/        # Developer info
│   │   └── offline/          # Offline fallback
│   ├── (payload)/            # Payload CMS admin
│   │   ├── admin/
│   │   └── api/
│   ├── api/                  # Custom API routes
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── collections/              # Payload collections
│   ├── Users.ts
│   ├── Profiles.ts
│   ├── Publications.ts
│   ├── Projects.ts
│   ├── News.ts
│   ├── Recruitment.ts
│   ├── Certificates.ts
│   ├── Notifications.ts
│   └── ...
├── components/               # Reusable components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── notification-panel.tsx
│   ├── home/                 # Homepage sections
│   ├── ui/                   # UI components
│   └── ...
├── contexts/                 # React contexts
│   └── notification-context.tsx
├── lib/                      # Utilities
│   ├── utils.ts
│   ├── fonts.ts
│   └── utilities/
├── public/                   # Static assets
│   ├── manifest.json
│   ├── sw.js                 # Service Worker
│   └── offline.html
├── docs/                     # Documentation
│   ├── QUICK_START.md
│   ├── RBAC_IMPLEMENTATION.md
│   ├── PAYLOAD_SETUP.md
│   └── ...
├── payload.config.ts         # Payload configuration
├── next.config.mjs          # Next.js configuration
├── tsconfig.json            # TypeScript config
└── tailwind.config.ts       # Tailwind config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MongoDB database
- AWS S3 compatible storage (Cloudflare R2 recommended)

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URI=mongodb://localhost:27017/cplab

# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# AWS S3 / Cloudflare R2
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=auto

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Push Notifications (Optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/cp-laboratory/cplab-latest.git
   cd cplab-latest
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Frontend: <http://localhost:3000>
   - Admin Dashboard: <http://localhost:3000/admin>

### First-Time Setup

1. Navigate to <http://localhost:3000/admin>
2. Create the first user account with **Professor (Admin)** role
3. Configure lab settings and content through the admin dashboard

## 📝 Usage Guide

### For Administrators (Professors)

1. **Managing Team Members**
   - Create user accounts for new lab members
   - Assign appropriate roles (Professor/Student)
   - Create and manage detailed profiles

2. **Publications**
   - Add new publications with complete metadata
   - Choose between internal lab members or external authors
   - For external authors: provide name, affiliation, and profile link
   - Upload PDFs and supplementary materials

3. **Projects**
   - Create project entries with comprehensive details
   - Assign team members and technologies
   - Upload project images and documents
   - Track project metrics and achievements

4. **Content Management**
   - Publish news and announcements
   - Manage FAQs and notices
   - Update lab highlights and research areas
   - Send push notifications to subscribers

### For Students

1. **Profile Management**
   - Update personal profile and portfolio
   - Add education and experience
   - Showcase skills and expertise

2. **Publications & Projects**
   - Create entries for publications where you're an author
   - Manage projects you're part of
   - View published content from the lab

## 🎨 Customization

### Theme Configuration

- Edit `tailwind.config.ts` for custom colors and styling
- Modify `app/globals.css` for global styles
- Theme colors automatically adapt to dark/light mode

### Component Customization

- All UI components are in `/components` directory
- Use Radix UI primitives for accessible components
- Framer Motion for animations

### Content Structure

- Modify collection schemas in `/collections` directory
- Add new fields or collections as needed
- Update TypeScript interfaces accordingly

## 🔒 Security Features

- **Role-Based Access Control**: Granular permissions for professors and students
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Client and server-side validation
- **HTTPS Enforcement**: Production deployments use HTTPS
- **Environment Variables**: Sensitive data stored securely

## 📱 Progressive Web App

The application is a fully functional PWA with:

- **Offline Support**: Service Worker caches essential resources
- **Installable**: Add to home screen on mobile devices
- **Push Notifications**: Real-time updates for important announcements
- **App-like Experience**: Smooth, native-like interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Docker

```bash
# Build the image
docker build -t cplab .

# Run the container
docker run -p 3000:3000 --env-file .env.local cplab
```

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 Performance

- **Server Components**: Optimized with React Server Components
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based code splitting
- **ISR**: Incremental Static Regeneration for dynamic content
- **Edge Caching**: CDN caching for static assets

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Payload CMS](https://payloadcms.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For support and questions:

- Email: <help@cplab.org>
- Website: [https://cplab.org](https://cplab.org)
- GitHub Issues: [Create an issue](https://github.com/cp-laboratory/cplab-latest/issues)

## 🔗 Links

- **Production**: <https://cplab.org>
- **Admin Dashboard**: <https://cplab.org/admin>
- **Documentation**: [/docs](./docs)
- **GitHub**: <https://github.com/cp-laboratory>
- **LinkedIn**: <https://www.linkedin.com/company/cp-laboratory/>
- **Facebook**: <https://www.facebook.com/cp.laboratory>

---

### **Developed with ❤️ by Shahriar Hasan**
