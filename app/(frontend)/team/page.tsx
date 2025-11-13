"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Lab Director & Professor",
    specialization: "Machine Learning & AI",
    image: "/professor-woman.jpg",
    bio: "Leading research in machine learning applications for cyber-physical systems.",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "Co-Director & Professor",
    specialization: "IoT & Embedded Systems",
    image: "/professor-man.jpg",
    bio: "Pioneering work in IoT integration and edge computing.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Senior Researcher",
    specialization: "Blockchain Technology",
    image: "/researcher-woman.jpg",
    bio: "Exploring distributed ledger technologies for secure systems.",
  },
  {
    id: 4,
    name: "Alex Kumar",
    role: "PhD Student",
    specialization: "Application Development",
    image: "/student-man.jpg",
    bio: "Developing scalable applications for cyber-physical systems.",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "PhD Student",
    specialization: "Cyber Security",
    image: "/student-woman.jpg",
    bio: "Research on security protocols for distributed systems.",
  },
  {
    id: 6,
    name: "James O'Brien",
    role: "Master's Student",
    specialization: "Edge Computing",
    image: "/student-man-2.jpg",
    bio: "Optimizing edge computing architectures.",
  },
]

export default function TeamPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = ["All", "Professor", "Researcher", "PhD Student", "Master's Student"]

  const filteredMembers =
    selectedRole && selectedRole !== "All"
      ? teamMembers.filter((member) => member.role.includes(selectedRole))
      : teamMembers

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <Navbar />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Our Team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the brilliant minds driving innovation in cyber-physical systems research.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role === "All" ? null : role)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  (role === "All" && !selectedRole) || selectedRole === role
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {role}
              </button>
            ))}
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/team/${member.id}`}>
                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 p-6">
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-3">{member.specialization}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>

                      <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                        View Profile
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
