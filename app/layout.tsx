import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://YOUR_DOMAIN.com"),
  title: {
    default: "Hidden Narratives",
    template: "%s | Hidden Narratives"
  },
  description:
    "Deep historical analysis. Power structures. Lost civilizations. Cinematic historical storytelling platform.",
  keywords: [
    "history",
    "ancient civilizations",
    "dark history",
    "hidden narratives",
    "geopolitics",
    "ancient egypt"
  ],
  openGraph: {
    title: "Hidden Narratives",
    description:
      "Deep historical analysis. Power structures. Lost civilizations.",
    type: "website",
    locale: "en_US",
    siteName: "Hidden Narratives"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        {/* NAVBAR */}
        <header className="navbar">
          <div className="nav-container">

            <Link href="/" className="logo">
              Hidden Narratives
            </Link>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/episodes">Episodes</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>

              <a
                href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn youtube"
              >
                YouTube
              </a>

              <a
                href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="footer">
          <div className="footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
          <p>© {new Date().getFullYear()} Hidden Narratives</p>
        </footer>

      </body>
    </html>
  )
}
