import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hidden Narratives",
  description: "Dark historical documentaries and mysterious stories.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
