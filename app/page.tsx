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

      {/* PARALLAX HERO */}
      <section className="cinemaHero">
        <div className="cinemaOverlay">
          <h1 className="cinemaTitle">
            Hidden Narratives
          </h1>
          <p className="cinemaSub">
            Deep historical analysis. Power structures. Lost civilizations.
          </p>
        </div>
      </section>

      {/* FEATURED CINEMATIC */}
      {featured && (
        <section className="cinemaFeatured">
          <h2 className="cinemaSectionTitle">
            Featured Investigation
          </h2>

          <Link
            href={`/episodes/${featured.slug}`}
            className="cinemaFeaturedCard"
          >
            <div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
            </div>
          </Link>
        </section>
      )}

      {/* GRID PLATFORM */}
      <section className="cinemaGridSection">
        <h2 className="cinemaSectionTitle">
          Latest Investigations
        </h2>

        <div className="cinemaGrid">
          {latest.map((article) => (
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
