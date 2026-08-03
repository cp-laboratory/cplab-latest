"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="section-pad">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass border border-white/5 px-8 py-16 text-center"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full bg-blue-500/10 blur-[60px] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">
              Stay Connected
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              Subscribe to CPLAB{" "}
              <span className="gradient-text">Newsletter</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed">
              Get the latest research publications, project updates, recruitment
              announcements, and lab news delivered to your inbox.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400" />
                <p className="text-white font-semibold text-lg">You&apos;re subscribed!</p>
                <p className="text-white/50 text-sm">
                  You&apos;ll receive CPLAB updates at <strong>{email}</strong>
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="newsletter-form"
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500/50 transition-colors bg-transparent"
                />
                <button
                  type="submit"
                  id="newsletter-submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" /> Subscribe
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
