"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { createDoc, COLLECTIONS } from "@/lib/firestore";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError("");
    try {
      await createDoc(COLLECTIONS.newsletter, { email, subscribedAt: new Date().toISOString() });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-pad bg-gray-50">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-oxford-900 border border-oxford-800 px-8 py-16 text-center shadow-xl"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 pattern-bg opacity-10" />

          <div className="relative z-10 max-w-xl mx-auto">
            <p className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-4">
              Stay Connected
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Subscribe to CPLAB{" "}
              <span className="text-amber-400">Newsletter</span>
            </h2>
            <p className="text-gray-300 mb-10 leading-relaxed text-lg">
              Get the latest research publications, project updates, recruitment
              announcements, and lab news delivered to your inbox.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <CheckCircle className="w-12 h-12 text-amber-400" />
                <p className="text-white font-bold text-lg">You&apos;re subscribed!</p>
                <p className="text-gray-300 text-sm">
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
                  className="flex-1 px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-amber-400/50 transition-colors"
                />
                <button
                  type="submit"
                  id="newsletter-submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded bg-amber-500 text-oxford-900 font-bold text-sm hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Subscribe
                </button>
              </form>
            )}
            {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
