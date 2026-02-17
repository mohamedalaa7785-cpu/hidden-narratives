import Link from "next/link"

export default function Home() {
  return (
    <main style={container}>

      {/* Hero */}
      <section style={hero}>
        <h1 style={heroTitle}>
          Uncovering the Stories History Tried to Bury
        </h1>
        <p style={heroText}>
          Dark historical documentaries and untold narratives beyond the surface.
        </p>
        <Link href="/videos" style={heroBtn}>
          Explore Videos
        </Link>
      </section>

      {/* About Preview */}
      <section style={section}>
        <h2 style={sectionTitle}>What is Hidden Narratives?</h2>
        <p style={sectionText}>
          Hidden Narratives explores controversial, mysterious, and forgotten
          historical events through cinematic storytelling and deep research.
          Our goal is to uncover truths that remain in the shadows.
        </p>
      </section>

      {/* CTA */}
      <section style={cta}>
        <h2>Support the Project</h2>
        <p>Explore our tools and resources used to build this platform.</p>
        <Link href="/tools" style={ctaBtn}>
          View Resources
        </Link>
      </section>

    </main>
  )
}

const container = {
  background: "#0d0d0d",
  color: "white",
  minHeight: "100vh"
}

const hero = {
  padding: "100px 40px",
  textAlign: "center" as const
}

const heroTitle = {
  fontSize: "40px",
  color: "#b08d57",
  marginBottom: "20px"
}

const heroText = {
  fontSize: "18px",
  color: "#aaa",
  marginBottom: "30px"
}

const heroBtn = {
  padding: "10px 20px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold"
}

const section = {
  padding: "60px 40px",
  maxWidth: "900px",
  margin: "0 auto"
}

const sectionTitle = {
  color: "#b08d57",
  marginBottom: "20px"
}

const sectionText = {
  lineHeight: "1.8",
  color: "#ccc"
}

const cta = {
  padding: "60px 40px",
  textAlign: "center" as const,
  borderTop: "1px solid #222"
}

const ctaBtn = {
  display: "inline-block",
  marginTop: "20px",
  padding: "10px 20px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold"
}
