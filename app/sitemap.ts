import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mohamedalaa7785-cpu-hidden-narratives-g2weiut95-hamo-projects.vercel.app"

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/videos`, lastModified: new Date() },
    { url: `${baseUrl}/episodes`, lastModified: new Date() },
    { url: `${baseUrl}/tools`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date() }
  ]
}
