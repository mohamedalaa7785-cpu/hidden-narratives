import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Hidden Narratives",
              "url": "https://mohamedalaa7785-cpu-hidden-narratives-g2weiut95-hamo-projects.vercel.app/",
              "sameAs": [
                "https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow",
                "https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              ]
            }`
          }}
        />
      </head>

      <body
        style={{
          margin: 0,
          background: "#0d0d0d",
          color: "white",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <header
          style={{
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #222",
            flexWrap: "wrap"
          }}
        >
          <h2 style={{ margin: 0, color: "#b08d57" }}>
            Hidden Narratives
          </h2>

          <nav
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <Link href="/" style={navLink}>Home</Link>
            <Link href="/episodes" style={navLink}>Episodes</Link>
            <Link href="/videos" style={navLink}>Videos</Link>
            <Link href="/tools" style={navLink}>Tools</Link>
            <Link href="/about" style={navLink}>About</Link>
            <Link href="/contact" style={navLink}>Contact</Link>

            <div style={divider} />

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

        <footer
          style={{
            padding: "30px",
            textAlign: "center",
            borderTop: "1px solid #222",
            marginTop: "60px",
            color: "#777"
          }}
        >
          © {new Date().getFullYear()} Hidden Narratives
        </footer>
      </body>
    </html>
  )
}

const navLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: 500,
  transition: "0.3s"
}

const divider: React.CSSProperties = {
  width: "1px",
  height: "20px",
  background: "#333"
}

const youtubeBtn: React.CSSProperties = {
  padding: "8px 16px",
  background: "linear-gradient(135deg,#b08d57,#d4af37)",
  color: "#000",
  borderRadius: "20px",
  textDecoration: "none",
  fontWeight: "bold"
}

const linkedinBtn: React.CSSProperties = {
  padding: "8px 16px",
  background: "#0A66C2",
  color: "#fff",
  borderRadius: "20px",
  textDecoration: "none",
  fontWeight: "bold"
}
