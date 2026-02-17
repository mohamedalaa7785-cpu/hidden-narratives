import fs from "fs"
import path from "path"
import Link from "next/link"

export default function RelatedArticles({ slug }: { slug: string }) {
  const dir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(dir)

  const related = files
    .filter(file => !file.includes(slug))
    .slice(0, 3)

  return (
    <div style={{ marginTop: "50px" }}>
      <h3 style={{ color: "#d4af37" }}>Related Articles</h3>
      <ul>
        {related.map(file => {
          const s = file.replace(".md", "")
          return (
            <li key={s}>
              <Link href={`/episodes/${s}`} style={{ color: "#ccc" }}>
                {s.replace(/-/g, " ")}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
