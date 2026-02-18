import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Hidden <span>Narratives</span>
          </h1>
          <p className="hero-subtitle">
            Deep historical analysis. Power structures. Lost civilizations.
          </p>
          <Link href="/episodes" className="hero-btn">
            Explore Episodes
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <h2>Join the Inner Circle</h2>
        <p>Receive strategic historical insights directly to your inbox.</p>

        <form
          action="https://YOUR_MAILCHIMP_URL"
          method="post"
          target="_blank"
          className="newsletter-form"
        >
          <input type="email" name="EMAIL" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Featured Analysis</h2>

        <div className="featured-card">
          <div className="featured-text">
            <h3>The Deep Political Structure of Ancient Egypt</h3>
            <p>
              A professional breakdown of governance, power hierarchy,
              economic control, and religious authority in ancient Egypt.
            </p>
            <Link href="/episodes/deep-power-ancient-egypt-en">
              Read Full Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* MONETIZATION CTA */}
      <section className="premium-cta">
        <h2>Unlock Premium Historical Intelligence</h2>
        <p>Access exclusive research reports and deep strategic breakdowns.</p>
        <a
          href="https://buymeacoffee.com/YOUR_LINK"
          target="_blank"
          className="premium-btn"
        >
          Support The Project
        </a>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-preview">
        <div className="about-image"></div>
        <div className="about-text">
          <h2>About Hidden Narratives</h2>
          <p>
            An independent research platform dedicated to uncovering
            forgotten historical structures and power dynamics through
            cinematic storytelling.
          </p>
          <Link href="/about">Learn More →</Link>
        </div>
      </section>
    </>
  )
}
