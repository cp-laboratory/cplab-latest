"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct mailto link with form data
    const mailtoLink = `mailto:help@cplab.org?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Show success message
    setIsSubmitted(true)
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our research? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
                <p className="text-muted-foreground">
                  Cyber Physical Laboratory
                  <br />
                  Basherhat, Dinajpur - 5200
                  <br />
                  Bangladesh
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:help@cplab.org" className="hover:text-primary transition-colors">
                    help@cplab.org
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+8801712534968" className="hover:text-primary transition-colors">
                    01712-534968
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Research Areas</h3>
                <div className="space-y-2">
                  {["Application Development", "Machine Learning", "Blockchain", "IoT", "Cyber Security"].map(
                    (area) => (
                      <p key={area} className="text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {area}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </motion.button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center"
                  >
                    Opening your email client... Please send the email to complete your message.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Location Map - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">Location</h3>
            <div className="rounded-lg overflow-hidden border border-border/50 w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5847394847!2d88.6544752!3d25.69708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4ad47cef4eb99%3A0x2e73ed582f7775ce!2sCyber%20Physical%20Laboratory!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(1) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
