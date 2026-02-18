import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"

export const metadata: Metadata = {
  title: "Hidden Narratives",
  description:
    "Deep historical analysis. Power structures. Lost civilizations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="nav-container">
            <h2 className="logo">Hidden Narratives</h2>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/episodes">Episodes</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Hidden Narratives</p>
        </footer>
      </body>
    </html>
  )
}
