import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://YOUR_DOMAIN"

  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/episodes` },
    { url: `${baseUrl}/videos` },
    { url: `${baseUrl}/tools` },
  ]
}
