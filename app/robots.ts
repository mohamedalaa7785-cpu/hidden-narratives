import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mohamedalaa7785-cpu-hidden-narratives-g2weiut95-hamo-projects.vercel.app/sitemap.xml",
  }
}
