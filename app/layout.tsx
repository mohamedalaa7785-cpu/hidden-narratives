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
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Hidden Narratives",
              "url": "https://mohamedalaa7785-cpu-hidden-narratives-qobpb4e5w-hamo-projects.vercel.app/",
              "sameAs": [
                "https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow",
                "https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              ]
            }`
          }}
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

            {/* YouTube Button */}
            <a
              href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
              target="_blank"
              rel="noopener noreferrer"
              style={youtubeBtn}
            >
              ▶ YouTube
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              target="_blank"
              rel="noopener noreferrer"
              style={linkedinBtn}
            >
              in LinkedIn
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

          <div style={{ marginBottom: "15px" }}>
            <a href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow" target="_blank" style={footerSocial}>
              YouTube
            </a>
            <a href="https://www.linkedin.com/in/muhammed-alaa-0169b3385" target="_blank" style={footerSocial}>
              LinkedIn
            </a>
          </div>

          © {new Date().getFullYear()} Hidden Narratives
        </footer>
      </body>
    </html>
  )
}

/* ================= STYLES ================= */

const bodyStyle = {
  margin: 0,
  background: "#0d0d0d",
  color: "white",
  fontFamily: "Arial, sans-serif"
}

const headerStyle = {
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #222",
  flexWrap: "wrap"
}

const logoStyle = {
  margin: 0,
  color: "#b08d57",
  letterSpacing: "1px"
}

const navStyle = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
  flexWrap: "wrap"
}

const navLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500"
}

const youtubeBtn = {
  padding: "8px 16px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "bold",
  boxShadow: "0 0 12px rgba(176,141,87,0.6)",
  transition: "0.3s"
}

const linkedinBtn = {
  padding: "8px 16px",
  background: "#0A66C2",
  color: "#fff",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "bold",
  boxShadow: "0 0 12px rgba(10,102,194,0.6)",
  transition: "0.3s"
}

const footerStyle = {
  padding: "40px",
  textAlign: "center",
  borderTop: "1px solid #222",
  marginTop: "60px",
  color: "#777"
}

const footerLink = {
  color: "#b08d57",
  textDecoration: "none",
  margin: "0 8px"
}

const footerSocial = {
  margin: "0 10px",
  color: "#b08d57",
  textDecoration: "none",
  fontWeight: "bold"
    }
