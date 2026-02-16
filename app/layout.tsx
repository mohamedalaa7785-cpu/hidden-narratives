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

      <body style={{
        margin: 0,
        background: "#0d0d0d",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}>
        <header style={{
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #222",
          flexWrap: "wrap"
        }}>
          <h2 style={{ margin: 0, color: "#b08d57" }}>
            Hidden Narratives
          </h2>

          <nav style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap"
          }}>
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>

            <Link href="/episodes" style={{ color: "white", textDecoration: "none" }}>
              Episodes
            </Link>

            <Link href="/videos" style={{ color: "white", textDecoration: "none" }}>
              Videos
            </Link>

            <Link href="/about" style={{ color: "white", textDecoration: "none" }}>
              About
            </Link>

            <Link href="/contact" style={{ color: "white", textDecoration: "none" }}>
              Contact
            </Link>

            <a
              href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 14px",
                background: "#b08d57",
                color: "#000",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              YouTube
            </a>

            <a
              href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 14px",
                background: "#0A66C2",
                color: "#fff",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              LinkedIn
            </a>
          </nav>
        </header>

        {children}

        <footer style={{
          padding: "30px",
          textAlign: "center",
          borderTop: "1px solid #222",
          marginTop: "60px",
          color: "#777"
        }}>
          © {new Date().getFullYear()} Hidden Narratives
        </footer>
      </body>
    </html>
  )
}
