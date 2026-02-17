import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

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
      title: data.title,
      description: data.description,
    }
  })
}

export default function Home() {
  const articles = getArticles()
  const latest = articles.slice(0, 6)

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#b08d57" }}>Hidden Narratives</h1>

      <div style={{ marginTop: "40px" }}>
        {latest.map((article) => (
          <Link
            key={article.slug}
            href={`/episodes/${article.slug}`}
            style={{
              display: "block",
              padding: "20px",
              marginBottom: "20px",
              background: "#141414",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none"
            }}
          >
            <h3>{article.title}</h3>
            <p style={{ color: "#aaa" }}>{article.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
            }
