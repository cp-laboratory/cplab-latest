"use client"

import React, { useRef } from "react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const ProjectContent = ({ title, description }: { title: string; description: string }) => {
  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => {
        return (
          <div
            key={"project-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {title}
              </span>{" "}
              {description}
            </p>
          </div>
        )
      })}
    </>
  )
}

const data = [
  {
    category: "Machine Learning",
    title: "Advancing AI Research",
    src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=3432&auto=format&fit=crop",
    content: (
      <ProjectContent
        title="Machine Learning & AI"
        description="Developing intelligent systems and algorithms for pattern recognition, prediction, and decision-making in cyber-physical systems."
      />
    ),
  },
  {
    category: "Blockchain",
    title: "Decentralized Systems",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=3432&auto=format&fit=crop",
    content: (
      <ProjectContent
        title="Blockchain Technology"
        description="Exploring distributed ledger technologies and building secure, transparent, and decentralized applications for the future."
      />
    ),
  },
  {
    category: "IoT",
    title: "Smart Connected Devices",
    src: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=3540&auto=format&fit=crop",
    content: (
      <ProjectContent
        title="Internet of Things"
        description="Integrating physical devices with digital systems for real-time data collection, monitoring, and intelligent automation."
      />
    ),
  },
  {
    category: "Application Development",
    title: "Building Modern Solutions",
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=3474&auto=format&fit=crop",
    content: (
      <ProjectContent
        title="Full-Stack Development"
        description="Creating scalable and efficient applications using modern frameworks, best practices, and cutting-edge technologies."
      />
    ),
  },
  {
    category: "Cyber-Physical Systems",
    title: "Bridging Digital & Physical",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3540&auto=format&fit=crop",
    content: (
      <ProjectContent
        title="CPS Research"
        description="Researching the integration of computation, networking, and physical processes for next-generation smart systems."
      />
    ),
  },
  {
    category: "Research",
    title: "Innovation & Discovery",
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=3540&auto=format&fit=crop",
    content: (
      <ProjectContent
        title="Research Publications"
        description="Publishing cutting-edge research in top-tier conferences and journals, contributing to the global research community."
      />
    ),
  },
]

export function LabProjectsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ))

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <div className="text-center mb-8 px-4">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Research & Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our cutting-edge research projects across AI, blockchain, IoT, and cybersecurity
          </p>
        </div>
        <Carousel items={cards} />
      </motion.div>
      </div>
    </section>
  )
}
