import Hero from "@/components/home/hero"
import ResearchAreas from "@/components/home/research-areas"
import ResearchFeatures from "@/components/home/research-features"
import LabHighlights from "@/components/home/lab-highlights"
import AnnouncementsSection from "@/components/home/announcements-section"
import { LabProjectsCarousel } from "@/components/home/lab-projects-carousel"
import { Navbar } from "@/components/navbar"
import { LabTestimonialsSection } from "@/components/home/lab-testimonials"
import FAQSection from "@/components/home/faq-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { LatestNewsSection } from "@/components/home/latest-news-section"
import { ProfessorsSection } from "@/components/home/professors-section"
import { Footer } from "@/components/footer"
import { getPayload } from 'payload'
import config from '@payload-config'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600 // 1 hour in seconds

interface Announcement {
  id: string
  title: string
  description: string
  link?: string
  pdfUrl?: string
  date: string
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isPublished: boolean
}

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: any
  publishedDate: string
  author: {
    id: string
    email: string
    name: string
  }
  featuredImage?: {
    id: string
    url: string
    alt: string
  }
  slug: string
}

interface Professor {
  id: string
  slug: string
  personalInfo: {
    fullName: string
    designation?: string
    profileImage?: {
      url: string
      alt?: string
    }
    bio?: string
  }
  contact?: {
    email?: string
  }
}

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const payload = await getPayload({ config })
    
    const notices = await payload.find({
      collection: 'notices',
      where: {
        isPublished: {
          equals: true,
        },
      },
      sort: '-date',
      limit: 100,
    })

    return notices.docs.map((notice: any) => ({
      id: notice.id,
      title: notice.title,
      description: notice.description,
      link: notice.link || undefined,
      pdfUrl: typeof notice.pdfFile === 'object' && notice.pdfFile?.url 
        ? notice.pdfFile.url 
        : undefined,
      date: notice.date,
    }))
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}

async function getFAQs(): Promise<FAQ[]> {
  try {
    const payload = await getPayload({ config })
    
    const faqs = await payload.find({
      collection: 'faq',
      where: {
        isPublished: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    return faqs.docs as FAQ[]
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

async function getNews(): Promise<NewsArticle[]> {
  try {
    const payload = await getPayload({ config })
    
    const news = await payload.find({
      collection: 'news',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: 6, // Get latest 6 news articles
    })

    return news.docs.map((article: any) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      publishedDate: article.publishedDate,
      author: article.author,
      featuredImage: typeof article.featuredImage === 'object' && article.featuredImage?.url 
        ? {
            id: article.featuredImage.id,
            url: article.featuredImage.url,
            alt: article.featuredImage.alt || article.title,
          }
        : undefined,
      slug: article.slug,
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

async function getProfessors(): Promise<Professor[]> {
  try {
    const payload = await getPayload({ config })
    
    const profiles = await payload.find({
      collection: 'profiles',
      where: {
        and: [
          {
            showPublic: {
              equals: true,
            },
          },
          {
            'personalInfo.memberType': {
              equals: 'professor',
            },
          },
        ],
      },
      sort: 'displayOrder',
      limit: 6, // Get up to 6 professors
      depth: 2,
    })

    return profiles.docs.map((profile: any) => ({
      id: profile.id,
      slug: profile.slug,
      personalInfo: {
        fullName: profile.personalInfo?.fullName,
        designation: profile.personalInfo?.designation,
        profileImage: typeof profile.personalInfo?.profileImage === 'object' && profile.personalInfo?.profileImage?.url
          ? {
              url: profile.personalInfo.profileImage.url,
              alt: profile.personalInfo.profileImage.alt || profile.personalInfo?.fullName,
            }
          : undefined,
        bio: profile.personalInfo?.bio,
      },
      contact: {
        email: profile.contact?.email,
      },
    }))
  } catch (error) {
    console.error('Error fetching professors:', error)
    return []
  }
}

export default async function Home() {
  // Fetch data at build time with ISR
  const [announcements, faqs, news, professors] = await Promise.all([
    getAnnouncements(),
    getFAQs(),
    getNews(),
    getProfessors(),
  ])

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Research Areas Section */}
      <div id="research">
        <ResearchAreas />
      </div>

      {/* Professors Section */}
      <div id="professors">
        <ProfessorsSection professors={professors} />
      </div>

      {/* Announcements Section */}
      <div id="announcements">
        <AnnouncementsSection announcements={announcements} />
      </div>

      {/* Lab Projects Carousel */}
      {/* <div id="projects-carousel">
        <LabProjectsCarousel />
      </div> */}

      {/* Latest News Section */}
      <div id="news">
        <LatestNewsSection articles={news} />
      </div>

      {/* Research Features Section with Animations */}
      {/* <div id="features">
        <ResearchFeatures />
      </div> */}

      {/* Lab Facts Section */}
      {/* <div id="facts">
        <LabFactsSection />
      </div> */}

      {/* Testimonials Section */}
      <div id="testimonials">
        <LabTestimonialsSection />
      </div>

      {/* Lab Highlights Section */}
      <div id="highlights">
        <LabHighlights />
      </div>


      {/* FAQ Section */}
      <div>
        <FAQSection faqs={faqs} />
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4">
        <NewsletterSection />
      </div>

      <Footer />
    </div>
  )
}
