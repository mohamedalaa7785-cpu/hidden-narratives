"use client"

import { useState } from "react"
import Link from "next/link"
import articles from "@/lib/articles"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const results = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main style={{ padding: "60px 40px" }}>
      <h1 style={{ color: "#b08d57" }}>Search Articles</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          maxWidth: "500px",
          background: "#111",
          border: "1px solid #333",
          color: "white",
          borderRadius: "8px"
        }}
      />

      <div style={{ marginTop: "40px" }}>
        {results.map((article) => (
          <Link
            key={article.slug}
            href={`/episodes/${article.slug}`}
            style={{
              display: "block",
              padding: "15px",
              marginBottom: "15px",
              background: "#141414",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none"
            }}
          >
            <h4>{article.title}</h4>
            <p style={{ color: "#aaa" }}>{article.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
