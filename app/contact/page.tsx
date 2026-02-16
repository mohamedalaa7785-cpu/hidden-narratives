"use client"
import { useState } from "react"

export default function Contact() {
  const [status, setStatus] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData
    })

    if (res.ok) setStatus("Message sent.")
    else setStatus("Error.")
  }

  return (
    <main className="section">
      <h1>Contact</h1>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Message" required />
        <button type="submit">Send</button>
      </form>

      <p>{status}</p>
    </main>
  )
}
