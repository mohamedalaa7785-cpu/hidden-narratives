async function getVideo(id: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )

  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data.items?.[0]
}

export default async function EpisodePage({
  params,
}: {
  params: { id: string }
}) {
  const video = await getVideo(params.id)

  if (!video) {
    return <div style={{ padding: 40 }}>Video not found.</div>
  }

  return (
    <main
      style={{
        padding: "60px 40px",
        background: "#0d0d0d",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <h1 style={{ color: "#b08d57", marginBottom: "20px" }}>
        {video.snippet.title}
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${params.id}`}
          title={video.snippet.title}
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        {new Date(video.snippet.publishedAt).toDateString()}
      </p>

      <p style={{ lineHeight: "1.8", color: "#ccc" }}>
        {video.snippet.description}
      </p>

      <a
        href={`https://www.youtube.com/watch?v=${params.id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "10px 20px",
          background: "#b08d57",
          color: "#000",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Watch on YouTube
      </a>
    </main>
  )
        }
