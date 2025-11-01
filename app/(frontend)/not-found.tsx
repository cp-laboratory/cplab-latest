"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl w-full text-center">
          {/* Animated 404 with circuit pattern */}
          <div className="relative mb-8">
            {/* Background glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            </div>
            
            {/* 404 Text */}
            <div className="relative">
              <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                404
              </h1>
              
              {/* Circuit pattern overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-10">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Circuit paths */}
                  <path
                    d="M50 150 L150 150 L150 100 L250 100"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  <path
                    d="M150 150 L150 200 L250 200"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  <path
                    d="M250 100 L300 100 L300 150"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  <path
                    d="M250 200 L300 200 L300 150"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  {/* Circuit nodes */}
                  <circle cx="150" cy="150" r="6" fill="currentColor" className="text-primary" />
                  <circle cx="150" cy="100" r="6" fill="currentColor" className="text-primary" />
                  <circle cx="150" cy="200" r="6" fill="currentColor" className="text-primary" />
                  <circle cx="250" cy="100" r="6" fill="currentColor" className="text-primary" />
                  <circle cx="250" cy="200" r="6" fill="currentColor" className="text-primary" />
                  <circle cx="300" cy="150" r="8" fill="currentColor" className="text-primary animate-pulse" />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The page you're looking for seems to have wandered off into the digital void. 
              Our lab's AI is still searching for it... 🔍
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Meanwhile, you might want to explore:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link
                href="/"
                className="group p-4 rounded-xl bg-background hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Home</p>
                    <p className="text-sm text-muted-foreground">Back to main page</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/team"
                className="group p-4 rounded-xl bg-background hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Our Team</p>
                    <p className="text-sm text-muted-foreground">Meet our researchers</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/publications"
                className="group p-4 rounded-xl bg-background hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Publications</p>
                    <p className="text-sm text-muted-foreground">Our research papers</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/news"
                className="group p-4 rounded-xl bg-background hover:bg-primary/10 border border-border hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">News</p>
                    <p className="text-sm text-muted-foreground">Latest updates</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button size="lg" className="gap-2 group">
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="gap-2">
                Contact Us
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Fun fact */}
          <div className="mt-16 text-sm text-muted-foreground">
            <p className="italic">
              "In the world of cyber-physical systems, a 404 error is just an opportunity 
              to debug and redirect." 🤖
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
