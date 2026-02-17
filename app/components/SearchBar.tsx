"use client"

import { useState } from "react"
import Link from "next/link"

interface Article {
  slug: string
  title: string
  tags: string[]
  category: string
}

export default function SearchBar({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const filtered = articles.filter(article => {
    const matchText =
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.slug.toLowerCase().includes(query.toLowerCase())

    const matchTag = tagFilter
      ? article.tags.includes(tagFilter)
      : true

    const matchCat = categoryFilter
      ? article.category === categoryFilter
      : true

    return matchText && matchTag && matchCat
  })

  const uniqueTags = Array.from(
    new Set(articles.flatMap(a => a.tags))
  )

  const uniqueCats = Array.from(
    new Set(articles.map(a => a.category))
  )

  return (
    <div style={{ margin: "30px 0" }}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "15px"
        }}
      />

      {/* Tag Filter */}
      <select
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        style={{
          padding: "8px",
          marginRight: "10px"
        }}
      >
        <option value="">All Tags</option>
        {uniqueTags.map(tag => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "8px"
        }}
      >
        <option value="">All Categories</option>
        {uniqueCats.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Results */}
      <ul style={{ marginTop: "20px" }}>
        {filtered.map(article => (
          <li key={article.slug}>
            <Link
              href={`/episodes/${article.slug}`}
              style={{ color: "#ccc" }}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p style={{ color: "#888", marginTop: "15px" }}>
          No articles found.
        </p>
      )}
    </div>
  )
      }
