import { Metadata } from "next"

async function getVideo(id: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )

  if (!res.ok) return null

  const data = await res.json()
  return data.items?.[0]
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const video = await getVideo(params.id)

  if (!video) return { title: "Video Not Found" }

  return {
    title: video.snippet.title,
    description: video.snippet.description
  }
}

export default async function VideoPage({ params }: any) {
  const video = await getVideo(params.id)

  if (!video) {
    return <div style={{ padding: 40 }}>Video not found.</div>
  }

  return (
    <main style={{
      padding: "60px 40px",
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ color: "#b08d57", marginBottom: "20px" }}>
        {video.snippet.title}
      </h1>

      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${params.id}`}
        title={video.snippet.title}
        allowFullScreen
        style={{ marginBottom: "30px" }}
      />

      <p style={{ color: "#ccc" }}>
        {video.snippet.description}
      </p>
    </main>
  )
}
