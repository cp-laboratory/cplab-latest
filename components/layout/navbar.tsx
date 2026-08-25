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
  { href: "/resources", label: "Resources" },
  { href: "/news", label: "News" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[50] transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm border-gray-200 shadow-sm py-2" 
            : "bg-white border-transparent py-4"
        }`}
      >
        <div className="container-xl mx-auto flex items-center justify-between">
          {/* Logo & Lab Name */}
          <Link href="/" className="flex items-center gap-4 shrink-0 group">
            <div className="w-10 h-10 rounded overflow-hidden shrink-0 transition-transform group-hover:scale-105">
              <Image src="/cplab-logo.png" alt="CPLAB Logo" width={40} height={40} className="w-full h-full object-cover" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-oxford-800 text-lg tracking-tight leading-tight group-hover:text-oxford-600 transition-colors">
                Cyber Physical Laboratory
              </span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                Research Institution
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-oxford-800 bg-oxford-50"
                      : "text-gray-600 hover:text-oxford-800 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-oxford-800 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/recruitment"
              className="px-5 py-2.5 rounded text-sm font-medium bg-oxford-800 text-white hover:bg-oxford-700 transition-colors shadow-sm"
            >
              Join the Lab
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[40] bg-white pt-20 px-6 md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-2 mt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-4 rounded-lg text-lg font-medium transition-colors border ${
                    isActive
                      ? "border-oxford-200 bg-oxford-50 text-oxford-800"
                      : "border-transparent text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
            
            <div className="h-px bg-gray-200 my-4" />
            
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/recruitment"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-4 py-4 text-center text-lg font-medium bg-oxford-800 text-white rounded-lg hover:bg-oxford-700 transition-colors"
            >
              Join the Lab
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
