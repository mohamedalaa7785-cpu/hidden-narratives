import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

export default function Episode({ params }: any) {
  const filePath = path.join(
    process.cwd(),
    "content/episodes",
    `${params.slug}.md`
  )

  const file = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(file)
  const html = marked(content)

  return (
    <main className="section">
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
