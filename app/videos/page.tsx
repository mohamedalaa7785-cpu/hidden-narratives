async function getVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const UPLOADS_PLAYLIST_ID = "UUIq_kU6XE1WuEmQXKaGF6ow"

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=10&key=${API_KEY}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return { items: [] }
  }

  return res.json()
}
