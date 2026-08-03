import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cyber Physical Laboratory | CPLAB",
  description:
    "Advancing research in Application Development, Machine Learning, Blockchain, IoT, and Cyber-Physical Systems at CPLAB.",
  keywords: ["CPLAB", "Cyber Physical Laboratory", "Research", "Machine Learning", "Blockchain", "IoT"],
  openGraph: {
    title: "Cyber Physical Laboratory | CPLAB",
    description:
      "Advancing research in Application Development, Machine Learning, Blockchain, IoT, and Cyber-Physical Systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
