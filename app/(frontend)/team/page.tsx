"use client""use client"



import { useEffect, useState } from "react"import { useState } from "react"

import { motion } from "framer-motion"import { motion } from "framer-motion"

import Link from "next/link"import Link from "next/link"

import Image from "next/image"import { Navbar } from "@/components/navbar"

import { Navbar } from "@/components/navbar"import { Footer } from "@/components/footer"

import { Footer } from "@/components/footer"

const teamMembers = [

interface TeamMember {  {

  id: string    id: 1,

  slug: string    name: "Dr. Sarah Johnson",

  personalInfo: {    role: "Lab Director & Professor",

    fullName: string    specialization: "Machine Learning & AI",

    memberType: string    image: "/professor-woman.jpg",

    designation?: string    bio: "Leading research in machine learning applications for cyber-physical systems.",

    profileImage?: {  },

      url: string  {

      alt?: string    id: 2,

    }    name: "Prof. Michael Chen",

    bio?: string    role: "Co-Director & Professor",

  }    specialization: "IoT & Embedded Systems",

  contact?: {    image: "/professor-man.jpg",

    email?: string    bio: "Pioneering work in IoT integration and edge computing.",

  }  },

  researchInterests?: Array<{ area: string }>  {

}    id: 3,

    name: "Dr. Emily Rodriguez",

export default function TeamPage() {    role: "Senior Researcher",

  const [professors, setProfessors] = useState<TeamMember[]>([])    specialization: "Blockchain Technology",

  const [students, setStudents] = useState<TeamMember[]>([])    image: "/researcher-woman.jpg",

  const [alumni, setAlumni] = useState<TeamMember[]>([])    bio: "Exploring distributed ledger technologies for secure systems.",

  const [scholars, setScholars] = useState<TeamMember[]>([])  },

  const [isLoading, setIsLoading] = useState(true)  {

    id: 4,

  useEffect(() => {    name: "Alex Kumar",

    const fetchTeam = async () => {    role: "PhD Student",

      try {    specialization: "Application Development",

        const response = await fetch('/api/team')    image: "/student-man.jpg",

        const data = await response.json()    bio: "Developing scalable applications for cyber-physical systems.",

          },

        setProfessors(data.professors || [])  {

        setStudents(data.students || [])    id: 5,

        setAlumni(data.alumni || [])    name: "Lisa Wang",

        setScholars(data.scholars || [])    role: "PhD Student",

        setIsLoading(false)    specialization: "Cyber Security",

      } catch (error) {    image: "/student-woman.jpg",

        console.error('Error fetching team:', error)    bio: "Research on security protocols for distributed systems.",

        setIsLoading(false)  },

      }  {

    }    id: 6,

    name: "James O'Brien",

    fetchTeam()    role: "Master's Student",

  }, [])    specialization: "Edge Computing",

    image: "/student-man-2.jpg",

  if (isLoading) {    bio: "Optimizing edge computing architectures.",

    return (  },

      <div className="min-h-screen bg-background">]

        <Navbar />

        <div className="flex items-center justify-center min-h-[60vh]">export default function TeamPage() {

          <div className="text-center">  const [selectedRole, setSelectedRole] = useState<string | null>(null)

            <svg className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" fill="none" viewBox="0 0 24 24">

              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>  const roles = ["All", "Professor", "Researcher", "PhD Student", "Master's Student"]

              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

            </svg>  const filteredMembers =

            <p className="text-muted-foreground">Loading team members...</p>    selectedRole && selectedRole !== "All"

          </div>      ? teamMembers.filter((member) => member.role.includes(selectedRole))

        </div>      : teamMembers

        <Footer />

      </div>  return (

    )    <div className="min-h-screen w-full relative bg-black">

  }      <div

        className="absolute inset-0 z-0"

  return (        style={{

    <div className="min-h-screen bg-background">          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",

      <Navbar />        }}

      />

      <main className="container mx-auto px-4 py-24">

        {/* Header */}      <Navbar />

        <motion.div

          initial={{ opacity: 0, y: 20 }}      <div className="relative z-10">

          animate={{ opacity: 1, y: 0 }}        {/* Header */}

          transition={{ duration: 0.5 }}        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">

          className="text-center mb-16"          <motion.div

        >            initial={{ opacity: 0, y: 20 }}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">            animate={{ opacity: 1, y: 0 }}

            Our Team            transition={{ duration: 0.5 }}

          </h1>            className="text-center mb-12"

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">          >

            Meet the brilliant minds driving innovation in cyber-physical systems research            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Our Team</h1>

          </p>            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">

        </motion.div>              Meet the brilliant minds driving innovation in cyber-physical systems research.

            </p>

        {/* Professors Section */}          </motion.div>

        {professors.length > 0 && (

          <motion.section          {/* Filter Buttons */}

            initial={{ opacity: 0, y: 20 }}          <motion.div

            animate={{ opacity: 1, y: 0 }}            initial={{ opacity: 0, y: 20 }}

            transition={{ delay: 0.2 }}            animate={{ opacity: 1, y: 0 }}

            className="mb-20"            transition={{ duration: 0.5, delay: 0.1 }}

          >            className="flex flex-wrap justify-center gap-3 mb-12"

            <h2 className="text-3xl font-bold mb-8">Faculty</h2>          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">            {roles.map((role) => (

              {professors.map((professor, index) => (              <button

                <motion.div                key={role}

                  key={professor.id}                onClick={() => setSelectedRole(role === "All" ? null : role)}

                  initial={{ opacity: 0, y: 20 }}                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${

                  animate={{ opacity: 1, y: 0 }}                  (role === "All" && !selectedRole) || selectedRole === role

                  transition={{ delay: 0.1 * index }}                    ? "bg-primary text-primary-foreground"

                >                    : "border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"

                  <Link href={`/team/${professor.slug || professor.id}`}>                }`}

                    <div className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 h-full">              >

                      <div className="flex gap-6">                {role}

                        {/* Large Profile Image */}              </button>

                        <div className="flex-shrink-0">            ))}

                          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">          </motion.div>

                            {professor.personalInfo.profileImage?.url ? (

                              <Image          {/* Team Grid */}

                                src={professor.personalInfo.profileImage.url}          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                alt={professor.personalInfo.profileImage.alt || professor.personalInfo.fullName}            {filteredMembers.map((member, index) => (

                                fill              <motion.div

                                className="object-cover group-hover:scale-105 transition-transform duration-300"                key={member.id}

                              />                initial={{ opacity: 0, y: 20 }}

                            ) : (                animate={{ opacity: 1, y: 0 }}

                              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-4xl font-bold">                transition={{ duration: 0.5, delay: index * 0.1 }}

                                {professor.personalInfo.fullName.charAt(0)}              >

                              </div>                <Link href={`/team/${member.id}`}>

                            )}                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">

                          </div>                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        </div>

                    <div className="relative z-10 p-6">

                        {/* Content */}                      <div className="mb-4 overflow-hidden rounded-lg">

                        <div className="flex-1 min-w-0">                        <img

                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">                          src={member.image || "/placeholder.svg"}

                            {professor.personalInfo.fullName}                          alt={member.name}

                          </h3>                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"

                          {professor.personalInfo.designation && (                        />

                            <p className="text-sm text-primary mb-2">{professor.personalInfo.designation}</p>                      </div>

                          )}

                          {professor.contact?.email && (                      <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>

                            <p className="text-sm text-muted-foreground mb-3">{professor.contact.email}</p>                      <p className="text-sm text-primary font-medium mb-2">{member.role}</p>

                          )}                      <p className="text-sm text-muted-foreground mb-3">{member.specialization}</p>

                          {professor.personalInfo.bio && (                      <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>

                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">

                              {professor.personalInfo.bio}                      <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">

                            </p>                        View Profile

                          )}                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                          {professor.researchInterests && professor.researchInterests.length > 0 && (                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />

                            <div className="flex flex-wrap gap-2">                        </svg>

                              {professor.researchInterests.slice(0, 3).map((interest, idx) => (                      </div>

                                <span                    </div>

                                  key={idx}                  </div>

                                  className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"                </Link>

                                >              </motion.div>

                                  {interest.area}            ))}

                                </span>          </div>

                              ))}        </div>

                            </div>      </div>

                          )}

                        </div>      <Footer />

                      </div>    </div>

                    </div>  )

                  </Link>}

                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Research Scholars Section */}
        {scholars.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Research Scholars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scholars.map((scholar, index) => (
                <StudentCard key={scholar.id} member={scholar} index={index} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Current Students Section */}
        {students.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Current Students</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {students.map((student, index) => (
                <StudentCard key={student.id} member={student} index={index} compact />
              ))}
            </div>
          </motion.section>
        )}

        {/* Alumni Section */}
        {alumni.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Alumni</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {alumni.map((alumnus, index) => (
                <StudentCard key={alumnus.id} member={alumnus} index={index} compact />
              ))}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {professors.length === 0 && students.length === 0 && alumni.length === 0 && scholars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No team members found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// Student Card Component
function StudentCard({ member, index, compact = false }: { member: TeamMember; index: number; compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <Link href={`/team/${member.slug || member.id}`}>
        <div className="group bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 h-full flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className={`relative ${compact ? 'w-20 h-20' : 'w-24 h-24'} rounded-full overflow-hidden bg-muted mb-3`}>
            {member.personalInfo.profileImage?.url ? (
              <Image
                src={member.personalInfo.profileImage.url}
                alt={member.personalInfo.profileImage.alt || member.personalInfo.fullName}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-2xl font-bold">
                {member.personalInfo.fullName.charAt(0)}
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2`}>
            {member.personalInfo.fullName}
          </h3>

          {/* Designation */}
          {member.personalInfo.designation && !compact && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {member.personalInfo.designation}
            </p>
          )}

          {/* Research Interests */}
          {!compact && member.researchInterests && member.researchInterests.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              {member.researchInterests.slice(0, 2).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs"
                >
                  {interest.area}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
