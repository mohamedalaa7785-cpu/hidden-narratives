import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const formData = await req.formData()
  const email = formData.get("email")

  console.log("New Subscriber:", email)

  return NextResponse.json({ success: true })
}
