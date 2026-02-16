async function getVideos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube`,
    {
      cache: "no-store"
    }
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
                border: "1px solid #222",
                transition: "0.3s"
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{
                  width: "100%",
                  display: "block"
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.4",
                    marginBottom: "10px"
                  }}
                >
                  {video.snippet.title}
                </h3>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#888"
                  }}
                >
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
