export default function handler(req, res) {
  const crushname = [
    {
      content: "Greetings",
      slug: "Greetings",
    },
  ]
  res.setHeader("Content-Type", "application/json")
  res.setHeader("X-Frame-Options", "DENY")
  res.setHeader("X-XSS-Protection", "1; mode=block")
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("Strict-Transport-Security", "max-age=63072000")
  res.setHeader("Cache-Control", "s-maxage=86400")
  res.status(200).json(crushname)
}
