import fs from "fs"
import path from "path"
import Link from "next/link"

export default function Home() {
  const dir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(dir).slice(0, 5)

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#d4af37" }}>Featured Articles</h1>

      <ul>
        {files.map(file => {
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
    </main>
  )
}
