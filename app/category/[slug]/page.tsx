import { getEpisodesByCategory } from "../../../lib/getEpisodes"
import EpisodeCard from "../../../components/EpisodeCard"

export default function Category({ params }: any) {
  const episodes = getEpisodesByCategory(params.slug)

  return (
    <main className="section">
      <h1>Category: {params.slug}</h1>
      {episodes.map((ep: any) => (
        <EpisodeCard key={ep.slug} episode={ep} />
      ))}
    </main>
  )
}
