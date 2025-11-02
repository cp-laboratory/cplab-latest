import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cyber Physical Laboratory",
  description: "Research insights on Application Development, Machine Learning, Blockchain, IoT and more",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CPLAB",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
