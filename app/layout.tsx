import "./globals.css"
import type { Metadata, Viewport } from "next"
import Link from "next/link"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL("https://hiddennarratives.vercel.app"),

  title: {
    default: "Hidden Narratives – Ancient History, Lost Civilizations & Dark History",
    template: "%s | Hidden Narratives",
  },

  description:
    "Hidden Narratives explores ancient civilizations, lost empires, and the untold stories behind history through deep analysis and documentary storytelling.",

  keywords: [
    "history",
    "ancient civilizations",
    "ancient egypt",
    "hidden narratives",
    "dark history",
    "documentary history",
    "historical analysis",
    "lost empires",
    "ancient mysteries",
  ],

  authors: [{ name: "Mohamed Alaa" }],
  creator: "Mohamed Alaa",

  openGraph: {
    title: "Hidden Narratives",
    description:
      "Explore ancient civilizations, lost empires, and hidden stories behind history.",
    url: "https://hiddennarratives.vercel.app",
    siteName: "Hidden Narratives",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hidden Narratives",
    description:
      "Explore ancient civilizations, lost empires, and hidden stories behind history.",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="wq9nowZwnBPIzL-Er-1I1Va4CMv-RQ4QqtEsIbdO8fs"
        />

        {/* Structured Data (SEO) */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hidden Narratives",
              url: "https://hiddennarratives.vercel.app",
              logo: "https://hiddennarratives.vercel.app/logo.png",
              sameAs: [
                "https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow",
                "https://www.facebook.com/share/182DKYKmki/",
                "https://www.linkedin.com/in/muhammed-alaa-0169b3385",
              ],
            }),
          }}
        />

        {/* Google AdSense */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2457467624248791"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

      </head>

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
              <Link href="/videos">Videos</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>

              <a
                href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn youtube"
                aria-label="Hidden Narratives YouTube Channel"
              >
                YouTube
              </a>

              <a
                href="https://www.facebook.com/share/182DKYKmki/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn facebook"
                aria-label="Hidden Narratives Facebook Page"
              >
                Facebook
              </a>

              <a
                href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin"
                aria-label="Hidden Narratives LinkedIn"
              >
                LinkedIn
              </a>
            </nav>

          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="main-content">{children}</main>

        {/* WHATSAPP BUTTON */}
        <a
          href="https://wa.me/201210708572"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label="Contact on WhatsApp"
        >
          WhatsApp
        </a>

        {/* FOOTER */}
        <footer className="footer">

          <div className="footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>

          <div className="footer-social">

            <a
              href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>

            <a
              href="https://www.facebook.com/share/182DKYKmki/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://wa.me/201210708572"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>

          </div>

          <p>© {new Date().getFullYear()} Hidden Narratives</p>

        </footer>

      </body>
    </html>
  )
  }
