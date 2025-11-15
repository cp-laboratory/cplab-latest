"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface TeamMember {
  id: string
  slug: string
  personalInfo: {
    fullName: string
    memberType: string
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

interface GroupedMembers {
  professors: TeamMember[]
  students: TeamMember[]
  alumni: TeamMember[]
  scholars: TeamMember[]
}

export default function TeamPage() {
  const [members, setMembers] = useState<GroupedMembers>({
    professors: [],
    students: [],
    alumni: [],
    scholars: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/team")
        if (!response.ok) throw new Error("Failed to fetch team")
        const data = await response.json()
        setMembers(data.members || { professors: [], students: [], alumni: [], scholars: [] })
      } catch (error) {
        console.error("Failed to fetch team:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <svg className="w-12 h-12 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the brilliant minds driving innovation in cyber-physical systems research
          </p>
        </motion.div>

        {/* Professors Section */}
        {members.professors && members.professors.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Faculty & Researchers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {members.professors.map((member, index) => (
                <ProfessorCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Students Section */}
        {members.students && members.students.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Current Students</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.students.map((member, index) => (
                <StudentCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Alumni Section */}
        {members.alumni && members.alumni.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Alumni</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.alumni.map((member, index) => (
                <StudentCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Scholars Section */}
        {members.scholars && members.scholars.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Scholars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.scholars.map((member, index) => (
                <StudentCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

// Professor Card Component (Large Format)
function ProfessorCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/team/${member.slug || member.id}`}>
        <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 h-64 md:h-auto flex-shrink-0">
              {member.personalInfo?.profileImage?.url ? (
                <Image
                  src={member.personalInfo.profileImage.url}
                  alt={member.personalInfo.profileImage.alt || member.personalInfo?.fullName || "Team member"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-6xl font-bold text-primary">
                  {member.personalInfo?.fullName?.charAt(0) || "?"}
                </div>
              )}
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {member.personalInfo?.fullName || "Unknown"}
              </h3>
              {member.personalInfo?.designation && (
                <p className="text-primary font-medium mb-3">{member.personalInfo.designation}</p>
              )}
              {member.personalInfo?.bio && (
                <p className="text-muted-foreground line-clamp-3">{member.personalInfo.bio}</p>
              )}
              {member.contact?.email && (
                <p className="text-sm text-muted-foreground mt-4">{member.contact.email}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Student Card Component (Compact Format)
function StudentCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/team/${member.slug || member.id}`}>
        <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg">
          <div className="relative w-full aspect-square">
            {member.personalInfo?.profileImage?.url ? (
              <Image
                src={member.personalInfo.profileImage.url}
                alt={member.personalInfo.profileImage.alt || member.personalInfo?.fullName || "Team member"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
                {member.personalInfo?.fullName?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {member.personalInfo?.fullName || "Unknown"}
            </h3>
            {member.personalInfo?.designation && (
              <p className="text-sm text-primary mb-2 line-clamp-1">{member.personalInfo.designation}</p>
            )}
            {member.personalInfo?.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">{member.personalInfo.bio}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
