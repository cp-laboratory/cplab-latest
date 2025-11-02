'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error (root):', error)
  }, [error])

  return (
    <html>
      <body>
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
                <div className="text-8xl font-bold text-red-500 mb-4">💥</div>
                <h1 className="text-4xl font-bold text-white mb-4">Critical Error</h1>
                <p className="text-lg text-gray-300 mb-8">
                  A critical error has occurred. Please try refreshing the page.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-left">
                  <h2 className="text-sm font-semibold text-red-400 mb-2">Error Details:</h2>
                  <p className="text-xs text-red-300 font-mono break-all">{error.message}</p>
                </div>
              )}

              <button
                onClick={reset}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  )
}
