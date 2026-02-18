import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
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
        <p>Receive deep historical insights directly to your inbox.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" />
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
              A comprehensive professional analysis of governance, religion,
              and economic control in Ancient Egypt.
            </p>
            <Link href="/episodes/deep-power-ancient-egypt-en">
              Read Full Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-preview">
        <div className="about-image" />
        <div className="about-text">
          <h2>About Hidden Narratives</h2>
          <p>
            An independent digital platform dedicated to uncovering hidden,
            controversial, and forgotten chapters of history through cinematic
            storytelling and structured research.
          </p>
          <Link href="/about">Learn More →</Link>
        </div>
      </section>
    </>
  )
}
