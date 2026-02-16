import Link from "next/link"

export default function EpisodeCard({ episode }: any) {
  return (
    <div className="card">
      <h3>{episode.title}</h3>
      <Link href={`/episodes/${episode.slug}`}>
        Read More
      </Link>
    </div>
  )
}
