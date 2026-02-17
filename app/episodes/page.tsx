import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

const POSTS_PER_PAGE = 6

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

export default function EpisodesPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const articles = getArticles()
  const page = parseInt(searchParams.page || "1")
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE)

  const paginated = articles.slice(start, end)

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#b08d57", marginBottom: "40px" }}>
        All Episodes
      </h1>

      <div style={grid}>
        {paginated.map((article) => (
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

      {/* Pagination */}
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/episodes?page=${i + 1}`}
            style={{
              margin: "0 8px",
              padding: "8px 14px",
              background: page === i + 1 ? "#b08d57" : "#141414",
              color: page === i + 1 ? "#000" : "#fff",
              borderRadius: "6px",
              textDecoration: "none"
            }}
          >
            {i + 1}
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
