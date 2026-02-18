import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

type Article = {
  slug: string
  title: string
  description: string
}

function getArticles(): Article[] {
  const dir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const slug = file.replace(".md", "")
    const filePath = path.join(dir, file)
    const content = fs.readFileSync(filePath, "utf8")
    const { data } = matter(content)

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
    }
  })
}

export default function Home() {
  const articles = getArticles()
  const latest = articles.slice(0, 6)
  const featured = articles[0]

  return (
    <main style={{ padding: "0 40px" }}>
      
      {/* HERO */}
      <section className="hero">
        <h1>Hidden Narratives</h1>
        <p>
          Deep historical analysis. Power structures. Lost civilizations.
        </p>
      </section>

      {/* FEATURED */}
      {featured && (
        <section style={{ marginTop: "100px" }}>
          <h2 style={{ color: "#b08d57", marginBottom: "30px" }}>
            Featured Analysis
          </h2>

          <Link
            href={`/episodes/${featured.slug}`}
            className="card"
          >
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
          </Link>
        </section>
      )}

      {/* LATEST */}
      <section style={{ marginTop: "100px", marginBottom: "80px" }}>
        <h2 style={{ color: "#b08d57", marginBottom: "30px" }}>
          Latest Articles
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px"
          }}
        >
          {latest.map((article) => (
            <Link
              key={article.slug}
              href={`/episodes/${article.slug}`}
              className="card"
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
