"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/team", label: "Team" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News" },
  { href: "/recruitment", label: "Join Us", highlight: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (currentY < lastScrollY || currentY < 80) {
        setIsVisible(true);
      } else if (currentY > lastScrollY && currentY > 200) {
        setIsVisible(false);
        setMobileOpen(false);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[9999] hidden md:block transition-colors duration-300 ${
          isScrolled ? "bg-[hsl(163,20%,5%)]/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-xl mx-auto h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-lg shrink-0">
              <Image src="/cplab-logo.png" alt="CPLAB Logo" width={32} height={32} className="w-full h-full object-cover" priority />
            </div>
            <span className="font-medium text-white text-lg tracking-wide">
              CPLAB
            </span>
          </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  link.highlight
                    ? "bg-gradient-to-r from-jade-500 to-jade-900 text-white px-4 hover:opacity-90"
                    : isActive
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="text-sm font-medium text-white/60 hover:text-white transition-colors shrink-0"
        >
          Contact
        </Link>
        </div>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed top-4 left-4 right-4 z-[9999] flex md:hidden items-center justify-between glass rounded-2xl px-4 py-3 shadow-2xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-white shrink-0">
            <Image src="/cplab-logo.png" alt="CPLAB Logo" width={28} height={28} className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-white text-sm">CPLAB</span>
        </Link>
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-20 left-4 right-4 glass rounded-2xl p-6 shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    link.highlight
                      ? "bg-gradient-to-r from-jade-500 to-jade-900 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  Contact
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
