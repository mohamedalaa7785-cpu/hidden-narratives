import fs from "fs"
import path from "path"
import Link from "next/link"
import Pagination from "../components/Pagination"

export default function Episodes({ searchParams }: any) {
  const page = parseInt(searchParams?.page || "1")
  const perPage = 5

  const dir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(dir)

  const totalPages = Math.ceil(files.length / perPage)
  const start = (page - 1) * perPage
  const paginated = files.slice(start, start + perPage)

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#d4af37" }}>All Articles</h1>

      <ul>
        {paginated.map(file => {
          const slug = file.replace(".md", "")
          return (
            <li key={slug}>
              <Link href={`/episodes/${slug}`} style={{ color: "#ccc" }}>
                {slug.replace(/-/g, " ")}
              </Link>
            </li>
          )
        })}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}
