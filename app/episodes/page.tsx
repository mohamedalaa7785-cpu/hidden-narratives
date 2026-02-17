import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import SearchBar from "../components/SearchBar"
import Pagination from "../components/Pagination"

export default function Episodes({ searchParams }: any) {
  const dir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(dir)

  const articles = files.map(file => {
    const slug = file.replace(".md", "")
    const filePath = path.join(dir, file)
    const md = fs.readFileSync(filePath, "utf8")
    const { data } = matter(md)
    return {
      slug,
      title: data.title,
      tags: data.tags || [],
      category: data.category || ""
    }
  })

  // Pagination logic
  const page = parseInt(searchParams?.page || "1")
  const perPage = 7
  const start = (page - 1) * perPage
  const paginated = articles.slice(start, start + perPage)
  const totalPages = Math.ceil(articles.length / perPage)

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#d4af37" }}>All Articles</h1>

      {/* Search + Filters */}
      <SearchBar articles={articles} />

      <ul>
        {paginated.map(article => (
          <li key={article.slug}>
            <Link href={`/episodes/${article.slug}`} style={{ color: "#ccc" }}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}
