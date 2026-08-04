"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { createDoc, COLLECTIONS } from "@/lib/firestore";

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createDoc(COLLECTIONS.contact, {
        ...form,
        read: false,
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(163_20%_5%)]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-jade-400 uppercase tracking-widest font-medium mb-4">Get in Touch</p>
            <h1 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              Contact <span className="gradient-text">CPLAB</span>
            </h1>
            <p className="text-xl text-white/50 max-w-xl mx-auto">
              Questions, collaborations, or just want to say hello? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="glass rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-medium text-white">Lab Information</h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-jade-500/10 border border-jade-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-jade-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Location</p>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Cyber Physical Laboratory<br />
                        Department of CSE<br />
                        Basherhat, Dinajpur - 5200<br />
                        Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-jade-500/10 border border-jade-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-jade-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Email</p>
                      <a href="mailto:help@cplab.org" className="text-sm text-jade-400 hover:text-jade-300 transition-colors">
                        help@cplab.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-jade-500/10 border border-jade-500/20 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-jade-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Phone</p>
                      <a href="tel:+8801712534968" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                        +880 1712-534968
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-sm font-medium text-white mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    {[
                      { icon: FacebookIcon, href: "https://www.facebook.com/cp.laboratory", label: "Facebook" },
                      { icon: GithubIcon, href: "https://github.com/cp-laboratory", label: "GitHub" },
                      { icon: LinkedinIcon, href: "https://www.linkedin.com/company/cp-laboratory/", label: "LinkedIn" },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-jade-500/30 transition-all"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="glass rounded-2xl p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-4 py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-400" />
                    <h3 className="text-2xl font-medium text-white">Message Sent!</h3>
                    <p className="text-white/50">
                      Thanks for reaching out. We&apos;ll get back to you within 1-2 business days.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-4 px-6 py-2.5 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/20 transition-all"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-medium text-white mb-8">Send a Message</h2>
                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-jade-500/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-jade-500/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Subject</label>
                        <input
                          id="contact-subject"
                          type="text"
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder="How can we help?"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-jade-500/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                        <textarea
                          id="contact-message"
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your inquiry..."
                          rows={6}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-jade-500/50 transition-colors resize-none"
                        />
                      </div>

                      {error && <p className="text-sm text-red-400">{error}</p>}

                      <button
                        type="submit"
                        id="contact-submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-jade-500 to-jade-900 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-jade-500/20 disabled:opacity-50"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
