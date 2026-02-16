import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const formData = await req.formData()
  const email = formData.get("email")
  const message = formData.get("message")

  console.log(email, message)

  return NextResponse.json({ success: true })
}
