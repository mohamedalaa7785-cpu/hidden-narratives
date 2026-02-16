import Link from "next/link"

async function getEpisodes() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const UPLOADS_PLAYLIST_ID = "UUIq_kU6XE1WuEmQXKaGF6ow"

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=20&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )

  if (!res.ok) return { items: [] }

  return res.json()
}

export default async function Episodes() {
  const data = await getEpisodes()

  return (
    <main style={{
      padding: "60px 40px",
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ color: "#b08d57", marginBottom: "40px" }}>
        All Episodes
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px"
      }}>
        {data.items?.map((video: any) => {
          const videoId = video.snippet?.resourceId?.videoId
          if (!videoId) return null

          return (
            <Link
              key={videoId}
              href={`/episodes/${videoId}`}
              style={{
                textDecoration: "none",
                color: "white",
                background: "#141414",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #222"
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "100%" }}
              />

              <div style={{ padding: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
                  {video.snippet.title}
                </h3>

                <p style={{ fontSize: "12px", color: "#888" }}>
                  {new Date(video.snippet.publishedAt).toDateString()}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
              }
