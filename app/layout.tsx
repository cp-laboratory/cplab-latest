import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { NotificationProvider } from "@/contexts/notification-context"
import { ThemeIsolator } from "@/components/theme-isolator"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cyber Physical Laboratory",
  description: "Research insights on Application Development, Machine Learning, Blockchain, IoT and more",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <meta name="theme-color" content="#1E88E5" />
        <link rel="icon" href="/cpl-logo.png" />
      </head>
      <body className="antialiased">
        <ThemeIsolator>
          <NotificationProvider>
            <ServiceWorkerRegister />
            {children}
            <Analytics />
            <SpeedInsights />
          </NotificationProvider>
        </ThemeIsolator>
      </body>
    </html>
  )
}
