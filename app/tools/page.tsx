export default function Tools() {
  return (
    <main style={container}>
      <h1>Tools & Resources</h1>

      <div style={card}>
        <h2>AI Video Tools</h2>
        <p>Platforms used to create cinematic historical videos.</p>
        <a href="#" style={btn}>Explore</a>
      </div>

      <div style={card}>
        <h2>Recommended Books</h2>
        <p>Deep historical research materials.</p>
        <a href="#" style={btn}>View Books</a>
      </div>
    </main>
  )
}

const container = {
  padding: "60px 40px",
  background: "#0d0d0d",
  minHeight: "100vh",
  color: "white"
}

const card = {
  background: "#141414",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  border: "1px solid #222"
}

const btn = {
  display: "inline-block",
  marginTop: "10px",
  padding: "8px 16px",
  background: "#b08d57",
  color: "#000",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold"
}
