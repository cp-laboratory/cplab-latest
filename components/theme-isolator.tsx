"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * ThemeIsolator component ensures that Payload CMS styles don't leak into the main application
 * by adding/removing appropriate CSS classes based on the current route
 */
export function ThemeIsolator({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/api')

  useEffect(() => {
    const htmlElement = document.documentElement
    const bodyElement = document.body

    if (isAdminRoute) {
      // Add admin-specific class when in admin routes
      htmlElement.classList.add('payload-admin')
      bodyElement.classList.add('payload-admin')
      // Remove frontend class
      htmlElement.classList.remove('frontend-app')
      bodyElement.classList.remove('frontend-app')
    } else {
      // Add frontend class when in main app routes
      htmlElement.classList.add('frontend-app')
      bodyElement.classList.add('frontend-app')
      // Remove admin class
      htmlElement.classList.remove('payload-admin')
      bodyElement.classList.remove('payload-admin')
    }

    // Cleanup on unmount
    return () => {
      htmlElement.classList.remove('payload-admin', 'frontend-app')
      bodyElement.classList.remove('payload-admin', 'frontend-app')
    }
  }, [isAdminRoute])

  return <>{children}</>
}
