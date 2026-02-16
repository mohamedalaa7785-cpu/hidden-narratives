import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Hidden Narratives | ما وراء الرواية",
  description: "History is never just what you're told."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
