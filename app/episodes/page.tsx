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

export default function EpisodesPage() {
  const articles = getArticles()

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#b08d57", marginBottom: "40px" }}>
        All Episodes
      </h1>

      <div style={grid}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/episodes/${article.slug}`}
            style={card}
          >
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
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
