export default function Disclaimer() {
  return (
    <main style={container}>
      <h1>Disclaimer</h1>

      <p>
        The content on this website is for informational purposes only.
      </p>

      <p>
        Some links may be affiliate links. We may earn a commission at no
        additional cost to you.
      </p>

      <p>
        We do not guarantee accuracy, reliability, or completeness of content.
      </p>
    </main>
  )
}

const container = {
  padding: "60px 40px",
  background: "#0d0d0d",
  minHeight: "100vh",
  color: "white",
  lineHeight: "1.8"
}
