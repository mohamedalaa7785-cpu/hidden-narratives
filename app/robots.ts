import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap:
      "https://mohamedalaa7785-cpu-hidden-narratives-qobpb4e5w-hamo-projects.vercel.app/sitemap.xml",
  }
}
