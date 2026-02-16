import fs from "fs"
import path from "path"
import matter from "gray-matter"

const dir = path.join(process.cwd(), "content/episodes")

export function getEpisodes() {
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const slug = file.replace(".md", "")
    const content = fs.readFileSync(path.join(dir, file), "utf8")
    const { data } = matter(content)

    return { slug, ...data }
  })
}

export function getEpisodesByCategory(category: string) {
  const episodes = getEpisodes()
  return episodes.filter((ep: any) => ep.category === category)
}
