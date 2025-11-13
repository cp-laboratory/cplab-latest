"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Lab Director & Professor",
    specialization: "Machine Learning & AI",
    image: "/professor-woman.jpg",
    bio: "Dr. Sarah Johnson is the director of the Cyber Physical Laboratory with over 15 years of experience in machine learning and artificial intelligence. She has published numerous papers in top-tier conferences and leads multiple research initiatives.",
    education: [
      "PhD in Computer Science, MIT",
      "MS in Machine Learning, Stanford University",
      "BS in Computer Engineering, UC Berkeley",
    ],
    research: ["Deep Learning for IoT Applications", "Federated Learning Systems", "AI-driven Cyber-Physical Systems"],
    publications: 45,
    citations: 1200,
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "Co-Director & Professor",
    specialization: "IoT & Embedded Systems",
    image: "/professor-man.jpg",
    bio: "Prof. Michael Chen is a leading expert in IoT and embedded systems with a focus on edge computing and real-time processing. His work has been instrumental in advancing cyber-physical system architectures.",
    education: [
      "PhD in Electrical Engineering, Carnegie Mellon",
      "MS in Computer Engineering, UC San Diego",
      "BS in Electronics, Tsinghua University",
    ],
    research: ["Edge Computing Architectures", "Real-time IoT Systems", "Embedded AI Solutions"],
    publications: 38,
    citations: 950,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Senior Researcher",
    specialization: "Blockchain Technology",
    image: "/researcher-woman.jpg",
    bio: "Dr. Emily Rodriguez specializes in blockchain technology and distributed systems. Her research focuses on creating secure and scalable solutions for cyber-physical systems using distributed ledger technologies.",
    education: [
      "PhD in Distributed Systems, UC Berkeley",
      "MS in Cryptography, Stanford University",
      "BS in Mathematics, University of Texas",
    ],
    research: ["Blockchain for IoT Security", "Distributed Consensus Algorithms", "Smart Contract Optimization"],
    publications: 28,
    citations: 650,
  },
  {
    id: 4,
    name: "Alex Kumar",
    role: "PhD Student",
    specialization: "Application Development",
    image: "/student-man.jpg",
    bio: "Alex Kumar is a PhD student focusing on developing scalable applications for cyber-physical systems. His research involves building efficient middleware and frameworks for distributed applications.",
    education: ["MS in Computer Science, University of Washington", "BS in Information Technology, Delhi University"],
    research: ["Microservices Architecture", "API Design for CPS", "Application Performance Optimization"],
    publications: 8,
    citations: 120,
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "PhD Student",
    specialization: "Cyber Security",
    image: "/student-woman.jpg",
    bio: "Lisa Wang is pursuing her PhD in cybersecurity with a focus on protecting distributed systems and IoT networks. Her work addresses vulnerabilities in cyber-physical system architectures.",
    education: ["MS in Cybersecurity, Georgia Tech", "BS in Computer Science, University of Toronto"],
    research: ["IoT Security Protocols", "Intrusion Detection Systems", "Secure Communication Channels"],
    publications: 6,
    citations: 85,
  },
  {
    id: 6,
    name: "James O'Brien",
    role: "Master's Student",
    specialization: "Edge Computing",
    image: "/student-man-2.jpg",
    bio: "James O'Brien is a Master's student researching edge computing architectures and optimization techniques. His work focuses on reducing latency and improving efficiency in distributed computing environments.",
    education: ["BS in Computer Engineering, University of Illinois"],
    research: ["Edge Computing Optimization", "Latency Reduction Techniques", "Resource Allocation Algorithms"],
    publications: 3,
    citations: 25,
  },
]

export default function TeamMemberPage() {
  const params = useParams()
  const memberId = Number.parseInt(params.id as string)
  const member = teamMembers.find((m) => m.id === memberId)

  if (!member) {
    return (
      <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Member Not Found</h1>
          <Link href="/team" className="text-primary hover:underline">
            Back to Team
          </Link>
        </div>
      </div>
    )
  }

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
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Link
            href="/team"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team
          </Link>
        </div>

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Image and Stats */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-xl overflow-hidden border border-border/50 mb-6">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-auto" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border/50 bg-card/50 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{member.publications}</div>
                    <div className="text-xs text-muted-foreground mt-1">Publications</div>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-card/50 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{member.citations}</div>
                    <div className="text-xs text-muted-foreground mt-1">Citations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold text-foreground mb-2">{member.name}</h1>
                <p className="text-lg text-primary font-medium mb-1">{member.role}</p>
                <p className="text-muted-foreground mb-6">{member.specialization}</p>

                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
                  <ul className="space-y-2">
                    {member.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-3 mt-1">•</span>
                        <span className="text-muted-foreground">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Research Interests */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Research Interests</h2>
                  <div className="flex flex-wrap gap-3">
                    {member.research.map((interest, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-sm text-foreground"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
