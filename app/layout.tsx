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
              "url": "https://mohamedalaa7785-cpu-hidden-narratives-g2weiut95-hamo-projects.vercel.app/",
              "sameAs": [
                "https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow",
                "https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              ]
            }`
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* Google AdSense Placeholder */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>

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

          <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/" style={navLink}>Home</Link>
            <Link href="/episodes" style={navLink}>Episodes</Link>
            <Link href="/videos" style={navLink}>Videos</Link>
            <Link href="/tools" style={navLink}>Tools</Link>
            <Link href="/about" style={navLink}>About</Link>
            <Link href="/contact" style={navLink}>Contact</Link>

            <a href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
              target="_blank"
              style={socialBtnGold}>
              YouTube
            </a>

            <a href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
              target="_blank"
              style={socialBtnBlue}>
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
          <div style={{ marginBottom: "10px" }}>
            <Link href="/privacy" style={footerLink}>Privacy</Link> |
            <Link href="/terms" style={footerLink}> Terms</Link> |
            <Link href="/disclaimer" style={footerLink}> Disclaimer</Link>
          </div>
          © {new Date().getFullYear()} Hidden Narratives
        </footer>

      </body>
    </html>
  )
}

const navLink = {
  color: "white",
  textDecoration: "none"
}

const footerLink = {
  color: "#b08d57",
  textDecoration: "none",
  margin: "0 8px"
}

const socialBtnGold = {
  padding: "6px 14px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "20px",
  textDecoration: "none",
  fontWeight: "bold"
}

const socialBtnBlue = {
  padding: "6px 14px",
  background: "#0A66C2",
  color: "#fff",
  borderRadius: "20px",
  textDecoration: "none",
  fontWeight: "bold"
            }
