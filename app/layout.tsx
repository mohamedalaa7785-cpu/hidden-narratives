import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hidden Narratives",
  description: "Deep historical investigations and untold narratives."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hidden Narratives",
              url: "https://YOUR_DOMAIN",
            })
          }}
        />
      </head>

      <body style={{
        margin: 0,
        background: "linear-gradient(135deg,#0d0d0d,#1a1a1a)",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}>
        <header style={{
          padding: "20px 40px",
          borderBottom: "1px solid #222",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <h2 style={{ color: "#d4af37" }}>Hidden Narratives</h2>

          <nav style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={link}>Home</Link>
            <Link href="/episodes" style={link}>Articles</Link>
            <Link href="/videos" style={link}>Videos</Link>
            <Link href="/tools" style={link}>Tools</Link>
            <Link href="/about" style={link}>About</Link>
            <Link href="/contact" style={link}>Contact</Link>
          </nav>
        </header>

        {children}

        <footer style={{
          padding: "30px",
          textAlign: "center",
          borderTop: "1px solid #222",
          marginTop: "60px",
          color: "#888"
        }}>
          <Link href="/privacy" style={footerLink}>Privacy</Link> |
          <Link href="/terms" style={footerLink}> Terms</Link> |
          <Link href="/disclaimer" style={footerLink}> Disclaimer</Link>
        </footer>
      </body>
    </html>
  )
}

const link = {
  color: "#ccc",
  textDecoration: "none"
}

const footerLink = {
  color: "#d4af37",
  textDecoration: "none",
  margin: "0 8px"
      }
