import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://mohamedalaa7785-cpu-hidden-narratives-qobpb4e5w-hamo-projects.vercel.app"

  const episodesDir = path.join(process.cwd(), "content/episodes")
  const files = fs.readdirSync(episodesDir)

  const episodeUrls = files.map((file) => ({
    url: `${baseUrl}/episodes/${file.replace(".md", "")}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/episodes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },
    ...episodeUrls,
  ]
}
