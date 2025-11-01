"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const newsArticles = [
  {
    id: 1,
    title: "Lab Receives Major Grant for IoT Security Research",
    date: "2024-01-15",
    author: "Dr. Sarah Johnson",
    category: "Funding",
    image: "/research-lab.jpg",
    content: `# Lab Receives Major Grant for IoT Security Research

The Cyber Physical Laboratory has been awarded a prestigious $2 million grant to advance research in IoT security and distributed systems. This funding will support our ongoing efforts to develop innovative solutions for protecting cyber-physical systems.

## Grant Details

The grant, awarded by the National Science Foundation, recognizes our laboratory's contributions to the field and will enable us to:

- Expand our research team with new PhD students and postdoctoral researchers
- Develop advanced security protocols for IoT networks
- Create testbeds for validating our research findings
- Collaborate with industry partners on real-world applications

## Research Focus

Our research will focus on three main areas:

1. **Intrusion Detection Systems**: Developing AI-powered systems to detect and prevent attacks on IoT networks
2. **Secure Communication**: Creating encryption and authentication protocols optimized for resource-constrained devices
3. **Blockchain Integration**: Exploring distributed ledger technologies for secure IoT ecosystems

## Impact

This grant represents a significant milestone for our laboratory and demonstrates the importance of our research to the broader scientific community. We are excited to use these resources to push the boundaries of what's possible in cyber-physical system security.

## Next Steps

Over the next three years, we will be recruiting new team members and launching several new research initiatives. We look forward to sharing our findings with the research community through publications and presentations at major conferences.`,
  },
  {
    id: 2,
    title: "New Publication on Federated Learning Accepted at Top Conference",
    date: "2024-01-10",
    author: "Alex Kumar",
    category: "Publication",
    image: "/business-conference.png",
    content: `# New Publication on Federated Learning Accepted at Top Conference

We are pleased to announce that our latest research on federated learning in heterogeneous networks has been accepted for presentation at the IEEE IoT Conference 2024. This work represents a significant advancement in distributed machine learning for cyber-physical systems.

## Paper Overview

The paper, titled "Federated Learning in Heterogeneous IoT Networks: Challenges and Solutions," addresses the challenges of training machine learning models across diverse IoT devices with varying computational capabilities.

## Key Contributions

Our research introduces:

- A novel federated learning framework optimized for heterogeneous networks
- Adaptive compression techniques to reduce communication overhead
- Privacy-preserving mechanisms for sensitive IoT data
- Experimental validation on real-world IoT deployments

## Significance

This work has important implications for:

- Smart cities and urban computing
- Industrial IoT and manufacturing
- Healthcare monitoring systems
- Environmental sensing networks

## Presentation Details

The paper will be presented at the IEEE IoT Conference 2024 in San Francisco on March 15, 2024. We invite colleagues and researchers to attend our presentation and discuss the findings.

## Future Work

Building on this research, we are planning several follow-up studies to explore:

- Federated learning with differential privacy
- Optimization for edge computing environments
- Real-time model updates and adaptation
- Integration with blockchain for secure model sharing`,
  },
  {
    id: 3,
    title: "Team Member Wins Best Paper Award",
    date: "2024-01-05",
    author: "Lab News",
    category: "Achievement",
    image: "/golden-trophy-on-pedestal.png",
    content: `# Team Member Wins Best Paper Award

Congratulations to Dr. Emily Rodriguez for receiving the Best Paper Award at the IEEE Cybersecurity Conference 2023! Her groundbreaking work on blockchain-based security frameworks for distributed systems has been recognized as the most impactful contribution to the conference.

## Award-Winning Research

Dr. Rodriguez's paper, "Blockchain-based Security Framework for Distributed Cyber-Physical Systems," presents a novel approach to securing distributed systems using blockchain technology.

## Key Innovations

The research introduces:

- A decentralized security architecture using blockchain
- Smart contracts for automated threat response
- Consensus mechanisms optimized for real-time systems
- Comprehensive security analysis and validation

## Recognition

This award recognizes the significance of Dr. Rodriguez's work in advancing the field of cybersecurity for distributed systems. The paper has already generated significant interest from both academia and industry.

## Impact

The findings from this research are being adopted by several organizations for securing their critical infrastructure. We expect this work to influence future standards and best practices in distributed system security.

## Celebration

The laboratory celebrated this achievement with a special seminar where Dr. Rodriguez presented her work to the entire team. This recognition motivates us to continue pushing the boundaries of research in cybersecurity and distributed systems.

## Future Opportunities

Following this success, Dr. Rodriguez has been invited to present her work at several international conferences and collaborate with leading research institutions around the world.`,
  },
  {
    id: 4,
    title: "Collaboration with Industry Partners Announced",
    date: "2023-12-28",
    author: "Prof. Michael Chen",
    category: "Partnership",
    image: "/partnership-hands.png",
    content: `# Collaboration with Industry Partners Announced

The Cyber Physical Laboratory is excited to announce new partnerships with leading technology companies to accelerate research in edge computing and artificial intelligence. These collaborations will bridge the gap between academic research and real-world applications.

## Partner Organizations

We are partnering with:

- **TechCorp Industries**: Focus on edge computing optimization
- **CloudSystems Inc**: Collaboration on distributed AI systems
- **SecureNet Solutions**: Joint research on cybersecurity

## Collaboration Goals

Our partnerships aim to:

- Develop practical solutions for real-world challenges
- Provide internship and employment opportunities for our students
- Access to industry-grade infrastructure and datasets
- Joint publication and patent opportunities

## Research Initiatives

The collaborations will focus on:

1. **Edge Computing**: Optimizing algorithms for edge devices
2. **Distributed AI**: Training models across distributed systems
3. **Security**: Implementing security protocols in production systems

## Benefits

These partnerships provide:

- Funding for research projects
- Access to real-world data and use cases
- Mentorship from industry experts
- Career opportunities for our graduates

## Timeline

The partnerships are effective immediately, with the first joint projects launching in Q1 2024. We expect these collaborations to produce significant research outcomes and practical applications.

## Contact

For more information about these partnerships or potential collaboration opportunities, please contact Prof. Michael Chen at m.chen@cpl.edu.`,
  },
  {
    id: 5,
    title: "New Research Initiative on Cyber-Physical System Security",
    date: "2023-12-20",
    author: "Dr. Sarah Johnson",
    category: "Research",
    image: "/digital-security-abstract.png",
    content: `# New Research Initiative on Cyber-Physical System Security

The Cyber Physical Laboratory is launching a comprehensive new research initiative focused on securing critical infrastructure through advanced cyber-physical system architectures. This initiative addresses the growing challenges of protecting interconnected systems in an increasingly digital world.

## Initiative Overview

The initiative encompasses research across multiple domains:

- Power grid security
- Transportation systems
- Healthcare infrastructure
- Manufacturing and industrial systems
- Smart city applications

## Research Objectives

Our goals are to:

- Develop novel security architectures for CPS
- Create real-time threat detection systems
- Design resilient recovery mechanisms
- Establish security standards and best practices

## Key Research Areas

1. **Anomaly Detection**: Using machine learning to identify unusual system behavior
2. **Resilience**: Designing systems that can recover from attacks
3. **Privacy**: Protecting sensitive data in distributed systems
4. **Compliance**: Ensuring adherence to security regulations

## Team Composition

The initiative brings together:

- Security experts
- Machine learning researchers
- Systems engineers
- Domain specialists

## Expected Outcomes

We anticipate:

- 15+ peer-reviewed publications
- 5+ patent applications
- Industry adoption of our security frameworks
- Training programs for practitioners

## Funding

The initiative is supported by grants from the National Science Foundation and industry partners. We are also seeking additional funding opportunities to expand the scope of our research.

## Get Involved

We are recruiting PhD students and postdoctoral researchers to join this initiative. Interested candidates should contact Dr. Sarah Johnson at s.johnson@cpl.edu.`,
  },
  {
    id: 6,
    title: "Lab Hosts International Workshop on IoT",
    date: "2023-12-15",
    author: "Lab News",
    category: "Event",
    image: "/workshop.png",
    content: `# Lab Hosts International Workshop on IoT

The Cyber Physical Laboratory successfully hosted an international workshop on Internet of Things (IoT) that brought together researchers, practitioners, and industry experts from around the world. The event featured keynote presentations, technical sessions, and networking opportunities.

## Workshop Highlights

The workshop included:

- 8 keynote presentations from leading researchers
- 25 technical paper presentations
- 3 hands-on tutorials
- 150+ attendees from 20 countries

## Keynote Speakers

Distinguished speakers included:

- Prof. James Wilson (MIT) - "Future of IoT"
- Dr. Lisa Chen (Stanford) - "AI for IoT"
- Prof. Ahmed Hassan (ETH Zurich) - "Security in IoT"

## Technical Sessions

Sessions covered:

1. **IoT Architectures**: Design patterns and best practices
2. **Machine Learning**: AI applications in IoT
3. **Security**: Protecting IoT systems
4. **Edge Computing**: Processing at the edge
5. **Applications**: Real-world IoT deployments

## Networking

The workshop provided excellent networking opportunities, with attendees connecting with peers and potential collaborators. Several new research collaborations were initiated during the event.

## Outcomes

The workshop resulted in:

- 12 new research collaborations
- 5 industry partnerships
- Plans for a follow-up workshop in 2024
- Published proceedings with selected papers

## Feedback

Attendees provided positive feedback, with 95% rating the workshop as excellent or very good. Many expressed interest in attending future events.

## Next Steps

Based on the success of this workshop, we are planning:

- A larger workshop in 2024
- Regional workshops in different parts of the world
- Online seminars for broader participation
- A special journal issue with selected papers

## Thank You

We would like to thank all the speakers, attendees, sponsors, and volunteers who made this workshop a success. We look forward to hosting future events and continuing to advance the field of IoT research.`,
  },
]

export default function NewsDetailPage() {
  const params = useParams()
  const articleId = Number.parseInt(params.id as string)
  const article = newsArticles.find((a) => a.id === articleId)

  if (!article) {
    return (
      <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/news" className="text-primary hover:underline">
            Back to News
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
        <div className="container mx-auto px-4 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden border border-border/50 mb-8">
              <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-96 object-cover" />
            </div>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  {article.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">{article.title}</h1>
              <p className="text-muted-foreground">By {article.author}</p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1
                  const text = paragraph.replace(/^#+\s/, "")
                  const className =
                    {
                      1: "text-3xl font-bold mt-8 mb-4",
                      2: "text-2xl font-bold mt-6 mb-3",
                      3: "text-xl font-bold mt-4 mb-2",
                    }[level] || "text-lg font-bold"
                  return (
                    <h2 key={index} className={`text-foreground ${className}`}>
                      {text}
                    </h2>
                  )
                }
                if (paragraph.startsWith("-")) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i}>{item.replace(/^-\s/, "")}</li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
                      ))}
                    </ol>
                  )
                }
                return (
                  <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Share this article</p>
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                  Twitter
                </button>
                <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                  LinkedIn
                </button>
                <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                  Email
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
