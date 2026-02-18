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

export default function Home() {
  const articles = getArticles()
  const latest = articles.slice(0, 6)
  const featured = articles[0]

  return (
    <main>

      {/* HERO CINEMATIC */}
      <section className="heroPro">
        <div className="heroOverlay">
          <h1>Hidden Narratives</h1>
          <p>Deep historical analysis. Power structures. Lost civilizations.</p>
        </div>
      </section>

      {/* FEATURED LARGE */}
      {featured && (
        <section className="featuredSection">
          <h2 className="sectionTitle">Featured Analysis</h2>

          <Link
            href={`/episodes/${featured.slug}`}
            className="featuredCard"
          >
            <div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
            </div>
          </Link>
        </section>
      )}

      {/* LATEST GRID */}
      <section className="latestSection">
        <h2 className="sectionTitle">Latest Articles</h2>

        <div className="gridPro">
          {latest.map((article) => (
            <Link
              key={article.slug}
              href={`/episodes/${article.slug}`}
              className="cardPro"
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
