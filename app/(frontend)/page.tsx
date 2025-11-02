"use client"
import { useState, useEffect } from "react"
import Hero from "@/components/home/hero"
import ResearchAreas from "@/components/home/research-areas"
import ResearchFeatures from "@/components/home/research-features"
import { LabTestimonialsSection } from "@/components/home/lab-testimonials"
import { LabFactsSection } from "@/components/home/lab-facts"
import LabHighlights from "@/components/home/lab-highlights"
import { LabProjectsCarousel } from "@/components/home/lab-projects-carousel"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/home/newsletter-section"
import FAQSection from "@/components/home/faq-section"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

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

      {/* Lab Projects Carousel */}
      <div id="projects-carousel">
        <LabProjectsCarousel />
      </div>

      {/* Research Features Section with Animations */}
      {/* <div id="features">
        <ResearchFeatures />
      </div> */}

      {/* Lab Facts Section */}
      <div id="facts">
        <LabFactsSection />
      </div>

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
        <FAQSection />
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4">
        <NewsletterSection />
      </div>

      <Footer />
    </div>
  )
}
