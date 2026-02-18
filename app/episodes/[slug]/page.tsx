import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import Link from "next/link"

type ArticleMeta = {
  slug: string
  title: string
  description: string
}

function getArticles(): ArticleMeta[] {
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

export async function generateMetadata({ params }: any) {
  const filePath = path.join(
    process.cwd(),
    "content/episodes",
    `${params.slug}.md`
  )

  const file = fs.readFileSync(filePath, "utf8")
  const { data } = matter(file)

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: `https://mohamedalaa7785-cpu-hidden-narratives-qobpb4e5w-hamo-projects.vercel.app/episodes/${params.slug}`,
    },
  }
}

export default function Episode({ params }: any) {
  const filePath = path.join(
    process.cwd(),
    "content/episodes",
    `${params.slug}.md`
  )

  const file = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(file)
  const html = marked(content)

  const articles = getArticles()
  const related = articles
    .filter((a) => a.slug !== params.slug)
    .slice(0, 3)

  return (
    <main style={{ padding: "80px 40px" }}>
      
      {/* ARTICLE HEADER */}
      <article style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#b08d57", fontSize: "42px" }}>
          {data.title}
        </h1>

        <p style={{ color: "#888", marginTop: "20px", marginBottom: "40px" }}>
          {data.description}
        </p>

        {/* ARTICLE CONTENT */}
        <div
          className="articleContent"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* RELATED */}
      <section style={{ marginTop: "120px" }}>
        <h2 style={{ color: "#b08d57", marginBottom: "40px" }}>
          Related Investigations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px"
          }}
        >
          {related.map((article) => (
            <Link
              key={article.slug}
              href={`/episodes/${article.slug}`}
              className="cinemaCard"
            >
              <h4>{article.title}</h4>
              <p>{article.description}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
      }
