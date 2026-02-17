import Link from "next/link"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

function getArticles() {
  const dir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const slug = file.replace(".md", "")
    const filePath = path.join(dir, file)
    const content = fs.readFileSync(filePath, "utf8")
    const { data } = matter(content)

    return {
      slug,
      ...data,
    }
  })
}

export default function Home() {
  const articles = getArticles()
  const latest = articles.slice(0, 6)
  const featured = articles[0]

  return (
    <main style={{ padding: "60px 40px" }}>
      
      {/* HERO */}
      <section style={heroSection}>
        <h1 style={heroTitle}>
          Hidden Narratives
        </h1>
        <p style={heroSubtitle}>
          Deep historical analysis. Power structures. Lost civilizations.
        </p>
        <a
          href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
          target="_blank"
          style={ctaBtn}
        >
          Watch on YouTube
        </a>
      </section>

      {/* FEATURED */}
      {featured && (
        <section style={{ marginTop: "80px" }}>
          <h2 style={sectionTitle}>Featured Analysis</h2>
          <Link href={`/episodes/${featured.slug}`} style={featuredCard}>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
          </Link>
        </section>
      )}

      {/* LATEST */}
      <section style={{ marginTop: "80px" }}>
        <h2 style={sectionTitle}>Latest Articles</h2>
        <div style={grid}>
          {latest.map((article) => (
            <Link
              key={article.slug}
              href={`/episodes/${article.slug}`}
              style={card}
            >
              <h4>{article.title}</h4>
              <p>{article.description}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}

/* ===== Styles ===== */

const heroSection = {
  textAlign: "center" as const,
  padding: "120px 20px",
  background: "linear-gradient(to bottom, #0d0d0d, #111)",
  borderRadius: "12px"
}

const heroTitle = {
  fontSize: "48px",
  color: "#b08d57",
  marginBottom: "20px"
}

const heroSubtitle = {
  fontSize: "18px",
  color: "#aaa",
  marginBottom: "30px"
}

const ctaBtn = {
  padding: "12px 28px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "30px",
  textDecoration: "none",
  fontWeight: "bold"
}

const sectionTitle = {
  color: "#b08d57",
  marginBottom: "30px"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "25px"
}

const card = {
  background: "#141414",
  padding: "20px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "white",
  border: "1px solid #222"
}

const featuredCard = {
  display: "block",
  padding: "30px",
  background: "#141414",
  borderRadius: "12px",
  textDecoration: "none",
  color: "white",
  border: "1px solid #b08d57"
      }
