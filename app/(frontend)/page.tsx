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

export default async function Home() {
  // Fetch data at build time
  const [announcements, faqs] = await Promise.all([
    getAnnouncements(),
    getFAQs(),
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

      {/* Announcements Section */}
      <div id="announcements">
        <AnnouncementsSection announcements={announcements} />
      </div>

      {/* Lab Projects Carousel */}
      <div id="projects-carousel">
        <LabProjectsCarousel />
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
      <div className="container mx-auto px-4">
        <NewsletterSection />
      </div>

      <Footer />
    </div>
  )
}
