export default function ContactPage() {
  return (
    <section className="contact-section">
      <div className="contact-overlay" />
      <div className="contact-box">
        <h1>Contact Hidden Narratives</h1>
        <p>Collaborations, research inquiries, or media partnerships.</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows={6} required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}
