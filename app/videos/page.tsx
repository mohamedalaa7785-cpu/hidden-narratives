async function getVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return { items: [] }
  }

  return res.json()
}

export default async function Videos() {
  const data = await getVideos()

  return (
    <main
      style={{
        padding: "60px 40px",
        background: "#0d0d0d",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "40px",
          color: "#b08d57"
        }}
      >
        Latest Videos
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px"
        }}
      >
        {data.items?.map((video: any) => {
          if (!video.id?.videoId) return null

          return (
            <a
              key={video.id.videoId}
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
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
                <h3 style={{ fontSize: "16px" }}>
                  {video.snippet.title}
                </h3>

                <p style={{ fontSize: "12px", color: "#888" }}>
                  {new Date(video.snippet.publishedAt).toDateString()}
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </main>
  )
            }
