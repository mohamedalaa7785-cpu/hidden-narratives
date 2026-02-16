export default function Tools() {
  return (
    <main
      style={{
        padding: "60px 40px",
        background: "#0d0d0d",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <h1 style={{ color: "#b08d57", marginBottom: "40px" }}>
        Tools & Resources
      </h1>

      <p style={{ color: "#aaa", marginBottom: "50px", maxWidth: "700px" }}>
        These are the tools and resources used to create cinematic dark
        historical documentaries and build Hidden Narratives.
      </p>

      {/* Tool Card */}
      <div
        style={{
          background: "#141414",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          border: "1px solid #222"
        }}
      >
        <h2 style={{ color: "#b08d57" }}>AI Video Creation Tools</h2>

        <p style={{ color: "#ccc", marginTop: "10px" }}>
          Advanced AI platforms used for cinematic storytelling,
          script generation and avatar-based narration.
        </p>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "15px",
            padding: "10px 20px",
            background: "#b08d57",
            color: "#000",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Explore Tools
        </a>
      </div>

      {/* Books */}
      <div
        style={{
          background: "#141414",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          border: "1px solid #222"
        }}
      >
        <h2 style={{ color: "#b08d57" }}>Recommended Historical Books</h2>

        <p style={{ color: "#ccc", marginTop: "10px" }}>
          Curated books that dive deeper into untold historical narratives.
        </p>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "15px",
            padding: "10px 20px",
            background: "#b08d57",
            color: "#000",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          View Books
        </a>
      </div>

      <p style={{ color: "#666", marginTop: "60px", fontSize: "14px" }}>
        Some links may be affiliate links. This helps support the platform
        at no extra cost to you.
      </p>
    </main>
  )
        }
