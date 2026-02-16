async function getVideos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube`,
    { cache: "no-store" }
  )
  return res.json()
}

export default async function Videos() {
  const data = await getVideos()

  return (
    <main className="section">
      <h1>Latest Videos</h1>

      <div style={{display:"grid",gap:"30px"}}>
        {data.items?.map((video: any) => (
          <a
            key={video.id.videoId}
            href={`https://youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              width="100%"
            />
            <h3>{video.snippet.title}</h3>
          </a>
        ))}
      </div>
    </main>
  )
}
