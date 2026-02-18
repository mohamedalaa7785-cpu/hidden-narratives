import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hidden Narratives",
  description:
    "Deep historical and political analysis uncovering hidden power structures and civilizational patterns.",
  openGraph: {
    title: "Hidden Narratives",
    description:
      "Deep historical and political analysis uncovering hidden power structures and civilizational patterns.",
    url: "https://YOUR_DOMAIN.com",
    siteName: "Hidden Narratives",
    locale: "en_US",
    type: "website",
  },
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

              <a
                href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-btn"
              >
                YouTube
              </a>

              <a
                href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Hidden Narratives</p>
            <div className="footer-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
          }
