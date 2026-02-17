import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import RelatedArticles from "@/app/components/RelatedArticles"

export async function generateMetadata({ params }: any) {
  return {
    title: `${params.slug.replace(/-/g, " ")} | Hidden Narratives`,
    description: "Deep historical analysis and investigative storytelling."
  }
}

export default function Episode({ params }: any) {
  const filePath = path.join(
    process.cwd(),
    "content/episodes",
    `${params.slug}.md`
  )

  const file = fs.readFileSync(filePath, "utf8")
  const { content } = matter(file)
  const html = marked(content)

  return (
    <main style={{ padding: "60px 40px" }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <RelatedArticles slug={params.slug} />
    </main>
  )
}
