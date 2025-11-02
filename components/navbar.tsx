"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          setIsScrolled(currentScrollY > 50)

          // Show navbar when scrolling up, hide when scrolling down
          if (currentScrollY < lastScrollY || currentScrollY < 50) {
            setIsNavbarVisible(true)
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsNavbarVisible(false)
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 max-w-5xl px-4 ${
          isScrolled ? "py-2" : "py-3"
        } ${isNavbarVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"}`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <Link className="z-50 flex items-center justify-center gap-2 transition-all duration-300" href="/">
          <img src="/cpl-logo.png" alt="CPLAB Logo" className="h-8 w-8 rounded-md border border-primary/30" />
          <span
            className={`font-bold text-foreground hidden sm:inline transition-all duration-300 ${isScrolled ? "text-sm" : "text-base"}`}
          >
            CPLAB
          </span>
        </Link>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <Link
            href="/team"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative z-20">Team</span>
          </Link>
          <Link
            href="/publications"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative z-20">Publications</span>
          </Link>
          <Link
            href="/projects"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative z-20">Projects</span>
          </Link>
          <Link
            href="/news"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative z-20">News</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 relative z-50">
          <Link
            href="/admin"
            className="font-medium transition-colors hover:text-foreground text-muted-foreground text-sm"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        } ${isNavbarVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"}`}
      >
        <Link className="flex items-center justify-center gap-2" href="/">
          <img src="/cpl-logo.png" alt="CPLAB Logo" className="h-7 w-7 rounded-md border border-primary/30" />
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/team"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Team
              </Link>
              <Link
                href="/publications"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Publications
              </Link>
              <Link
                href="/projects"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Projects
              </Link>
              <Link
                href="/news"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                News
              </Link>
              <div className="border-t border-border/50 pt-4 mt-4">
                <Link
                  href="/admin"
                  className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50 block"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
