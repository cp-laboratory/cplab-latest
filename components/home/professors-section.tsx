"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

interface ProfessorsSectionProps {
  professors: Professor[]
}

export function ProfessorsSection({ professors }: ProfessorsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  if (!professors || professors.length === 0) {
    return null
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Meet Our Faculty
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leading experts in cyber-physical systems, AI, and IoT research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {professors.slice(0, 3).map((professor, index) => (
            <motion.div
              key={professor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/team/${professor.slug || professor.id}`}>
                <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    {professor.personalInfo?.profileImage?.url ? (
                      <Image
                        src={professor.personalInfo.profileImage.url}
                        alt={professor.personalInfo.profileImage.alt || professor.personalInfo?.fullName || "Professor"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary">
                          {professor.personalInfo?.fullName?.charAt(0) || "?"}
                        </span>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {professor.personalInfo?.fullName || "Unknown"}
                    </h3>
                    {professor.personalInfo?.designation && (
                      <p className="text-primary font-medium text-sm mb-3">
                        {professor.personalInfo.designation}
                      </p>
                    )}
                    {professor.personalInfo?.bio && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                        {professor.personalInfo.bio}
                      </p>
                    )}
                    {professor.contact?.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {professor.contact.email}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Team Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            href="/team"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Team Members
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
