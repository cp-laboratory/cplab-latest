'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    // Redirect to home when back online
    if (isOnline) {
      window.location.href = '/'
    }
  }, [isOnline])

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8">
            {/* Animated offline icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              📡
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">You're Offline</h1>
            <p className="text-lg text-muted-foreground mb-8">
              It looks like you've lost your internet connection. Don't worry, some content may still be available.
            </p>
          </div>

          {/* Connection status indicator */}
          <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
              <p className="text-sm text-yellow-400">
                {isOnline ? 'Connected! Redirecting...' : 'No Internet Connection'}
              </p>
            </div>
          </div>

          {/* Helpful information */}
          <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
            <div className="p-4 rounded-lg bg-card/50 border border-border/30">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>What you can do:</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Try disabling airplane mode</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Check your Wi-Fi or mobile data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Previously visited pages may be cached</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
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
                Go to Home
              </motion.button>
            </Link>
          </div>

          {/* PWA Info */}
          <div className="mt-12 text-xs text-muted-foreground">
            <p>CPLAB PWA • Offline Mode</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
