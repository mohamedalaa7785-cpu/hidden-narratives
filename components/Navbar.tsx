import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      <Link href="/episodes">Episodes</Link>
      <Link href="/ar">العربية</Link>
    </nav>
  )
}
