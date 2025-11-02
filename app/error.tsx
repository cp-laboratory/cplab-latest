'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary mb-4">Oops!</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Something went wrong</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We encountered an unexpected error. Don't worry, we're working on fixing it.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-left">
              <h2 className="text-sm font-semibold text-red-400 mb-2">Error Details (Development Only):</h2>
              <p className="text-xs text-red-300 font-mono break-all">{error.message}</p>
              {error.digest && (
                <p className="text-xs text-red-300/70 mt-2">Digest: {error.digest}</p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </motion.button>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-card border border-border/50 text-foreground font-semibold rounded-lg hover:bg-card/80 transition-colors"
              >
                Go Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
