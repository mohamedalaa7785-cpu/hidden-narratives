import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
  title: "Hidden Narratives",
  description: "Dark historical documentaries and mysterious stories."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="PASTE_YOUR_CODE_HERE"
        />
      </head>

      <body style={bodyStyle}>
        <header style={headerStyle}>
          <h2 style={logoStyle}>Hidden Narratives</h2>

          <nav style={navStyle}>
            <Link href="/" style={navLink}>Home</Link>
            <Link href="/episodes" style={navLink}>Episodes</Link>
            <Link href="/videos" style={navLink}>Videos</Link>
            <Link href="/about" style={navLink}>About</Link>
            <Link href="/contact" style={navLink}>Contact</Link>
            <Link href="/search" style={navLink}>Search</Link>
          </nav>
        </header>

        {children}

        <footer style={footerStyle}>
          © {new Date().getFullYear()} Hidden Narratives
        </footer>
      </body>
    </html>
  )
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  background: "#0d0d0d",
  color: "white",
  fontFamily: "Arial, sans-serif"
}

const headerStyle: React.CSSProperties = {
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #222",
  flexWrap: "wrap"
}

const logoStyle: React.CSSProperties = {
  margin: 0,
  color: "#b08d57"
}

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
  flexWrap: "wrap"
}

const navLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none"
}

const footerStyle: React.CSSProperties = {
  padding: "30px",
  textAlign: "center",
  borderTop: "1px solid #222",
  marginTop: "60px",
  color: "#777"
    }
