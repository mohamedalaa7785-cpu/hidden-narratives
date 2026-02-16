"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#111",
        borderBottom: "1px solid #222"
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#b08d57" }}>
          Hidden Narratives
        </Link>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "25px" }}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>

        <Link href="/episodes" style={linkStyle}>
          Episodes
        </Link>

        <Link href="/videos" style={linkStyle}>
          Videos
        </Link>

        <Link href="/about" style={linkStyle}>
          About
        </Link>

        <Link href="/contact" style={linkStyle}>
          Contact
        </Link>
      </div>
    </nav>
  )
}

const linkStyle = {
  textDecoration: "none",
  color: "#ccc",
  fontSize: "14px",
  transition: "0.3s"
          }
