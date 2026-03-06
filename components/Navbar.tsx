"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const translations = {
  en: {
    home: "Home",
    episodes: "Episodes",
    videos: "Videos",
    about: "About",
    contact: "Contact",
    switchLang: "العربية"
  },
  ar: {
    home: "الرئيسية",
    episodes: "الحلقات",
    videos: "الفيديوهات",
    about: "حول الموقع",
    contact: "اتصل بنا",
    switchLang: "English"
  }
}

export default function Navbar() {

  const [lang, setLang] = useState<"en" | "ar">("en")

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [lang])

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
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>

        <Link href="/" style={linkStyle}>
          {t.home}
        </Link>

        <Link href="/episodes" style={linkStyle}>
          {t.episodes}
        </Link>

        <Link href="/videos" style={linkStyle}>
          {t.videos}
        </Link>

        <Link href="/about" style={linkStyle}>
          {t.about}
        </Link>

        <Link href="/contact" style={linkStyle}>
          {t.contact}
        </Link>

        {/* Language Switch */}
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          style={{
            background: "#b08d57",
            color: "#000",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          {t.switchLang}
        </button>

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
