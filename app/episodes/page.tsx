import EpisodeCard from "@/components/EpisodeCard"
import { getEpisodes } from "@/lib/getEpisodes"


export default function Episodes() {
  const episodes = getEpisodes()

  return (
    <main className="section">
      <h2>Episodes</h2>
      {episodes.map((ep: any) => (
        <EpisodeCard key={ep.slug} episode={ep} />
      ))}
    </main>
  )
}
