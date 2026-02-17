import Link from "next/link"

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  return (
    <div style={{ marginTop: "40px" }}>
      {currentPage > 1 && (
        <Link href={`/episodes?page=${currentPage - 1}`} style={btn}>
          Previous
        </Link>
      )}

      {currentPage < totalPages && (
        <Link href={`/episodes?page=${currentPage + 1}`} style={btn}>
          Next
        </Link>
      )}
    </div>
  )
}

const btn = {
  marginRight: "15px",
  padding: "6px 12px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "6px",
  textDecoration: "none"
}
