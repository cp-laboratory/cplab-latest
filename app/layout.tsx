import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
    images: [{ url: "/cplab-logo.png" }],
  },
  twitter: {
    card: "summary",
    title: "Cyber Physical Laboratory | CPLAB",
    description:
      "Advancing research in Application Development, Machine Learning, Blockchain, IoT, and Cyber-Physical Systems.",
    images: ["/cplab-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
