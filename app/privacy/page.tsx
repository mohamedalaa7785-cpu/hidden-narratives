export default function Privacy() {
  return (
    <main style={container}>
      <h1>Privacy Policy</h1>

      <p>
        Hidden Narratives respects your privacy. We may collect non-personal
        information such as browser type, device, and visited pages for
        analytics and performance improvement.
      </p>

      <h2>Cookies</h2>
      <p>
        This website uses cookies to enhance user experience and may display
        advertisements through Google AdSense which also uses cookies.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use third-party services including Google Analytics and
        Google AdSense. These services may collect information according
        to their own privacy policies.
      </p>

      <h2>Consent</h2>
      <p>
        By using this website, you consent to our privacy policy.
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
