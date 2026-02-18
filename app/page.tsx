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
      title: data.title || "Untitled",
      description: data.description || "",
    }
  })
}

export default function Home() {
  const articles = getArticles()
  const latest = articles.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <h1>Hidden Narratives</h1>
        <p>
          Deep historical analysis. Power structures. Lost civilizations.
        </p>
        <Link href="/episodes" className="button">
          Explore Episodes
        </Link>
      </section>

      {/* LATEST SECTION */}
      <h2 className="section-title">Latest Analyses</h2>

      <div className="episodes-grid">
        {latest.map((article) => (
          <Link
            key={article.slug}
            href={`/episodes/${article.slug}`}
            className="card"
          >
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </Link>
        ))}
      </div>
    </>
  )
                   }
