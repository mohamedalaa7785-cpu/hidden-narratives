import fs from "fs"
import path from "path"
import matter from "gray-matter"

const dir = path.join(process.cwd(), "content/episodes")
const files = fs.readdirSync(dir)

const articles = files.map((file) => {
  const slug = file.replace(".md", "")
  const filePath = path.join(dir, file)
  const content = fs.readFileSync(filePath, "utf8")
  const { data } = matter(content)

  return {
    slug,
    ...data,
  }
})

export default articles
