import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

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
      <body className="body">
        <header className="header">
          <h2 className="logo">Hidden Narratives</h2>

          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/episodes">Episodes</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

            <a
              href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
              target="_blank"
              rel="noopener noreferrer"
              className="ytBtn"
            >
              YouTube
            </a>

            <a
              href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              target="_blank"
              rel="noopener noreferrer"
              className="liBtn"
            >
              LinkedIn
            </a>
          </nav>
        </header>

        {children}

        <footer className="footer">
          <div>
            <Link href="/privacy">Privacy</Link> |
            <Link href="/terms"> Terms</Link> |
            <Link href="/disclaimer"> Disclaimer</Link>
          </div>
          <p>© {new Date().getFullYear()} Hidden Narratives</p>
        </footer>
      </body>
    </html>
  )
}
