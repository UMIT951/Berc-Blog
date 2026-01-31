import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: {
    default: "BERC",
    template: "%s | BERC",
  },
  description: "Elektronik, yazilim, gomulu sistemler. Net, teknik, sade.",
  keywords: ["elektronik", "yazilim", "gomulu sistemler", "algoritmalar", "mikrodenetleyici", "embedded"],
  authors: [{ name: "BERC" }],
  creator: "BERC",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://berc.blog",
    siteName: "BERC",
    title: "BERC",
    description: "Elektronik, yazilim, gomulu sistemler.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BERC",
    description: "Elektronik, yazilim, gomulu sistemler.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
