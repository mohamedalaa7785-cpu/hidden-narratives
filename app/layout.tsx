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
      <body style={bodyStyle}>

        <header style={headerStyle}>
          <h2 style={logoStyle}>Hidden Narratives</h2>

          <nav style={navStyle}>
            <Link href="/" style={navLink}>Home</Link>
            <Link href="/episodes" style={navLink}>Episodes</Link>
            <Link href="/videos" style={navLink}>Videos</Link>
            <Link href="/tools" style={navLink}>Tools</Link>
            <Link href="/about" style={navLink}>About</Link>
            <Link href="/contact" style={navLink}>Contact</Link>
            <Link href="/search" style={navLink}>Search</Link>

            <a
              href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
              target="_blank"
              rel="noopener noreferrer"
              style={youtubeBtn}
            >
              YouTube
            </a>

            <a
              href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              target="_blank"
              rel="noopener noreferrer"
              style={linkedinBtn}
            >
              LinkedIn
            </a>
          </nav>
        </header>

        {children}

        <footer style={footerStyle}>
          <div style={{ marginBottom: "10px" }}>
            <Link href="/privacy" style={footerLink}>Privacy</Link> |
            <Link href="/terms" style={footerLink}> Terms</Link> |
            <Link href="/disclaimer" style={footerLink}> Disclaimer</Link>
          </div>

          <p style={{ marginTop: 10 }}>
            © {new Date().getFullYear()} Hidden Narratives
          </p>
        </footer>

      </body>
    </html>
  )
}

/* ===== STYLES ===== */

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
  textDecoration: "none",
  fontWeight: "500"
}

const youtubeBtn: React.CSSProperties = {
  padding: "8px 16px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "bold"
}

const linkedinBtn: React.CSSProperties = {
  padding: "8px 16px",
  background: "#0A66C2",
  color: "#fff",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "bold"
}

const footerStyle: React.CSSProperties = {
  padding: "30px",
  textAlign: "center",
  borderTop: "1px solid #222",
  marginTop: "60px",
  color: "#777"
}

const footerLink: React.CSSProperties = {
  color: "#b08d57",
  textDecoration: "none",
  margin: "0 8px"
}
