import slugify from "slugify"

const fetchData = (req, res) => {
  const { user } = req.query
  const seo_title = slugify(user, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: false,
  })
  if (user == "null") {
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
  } else {
    const crushname = [
      {
        content: seo_title.replace(/[-]/g, " ") || "Hello World",
        slug: seo_title || "Hello World",
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
}

export default fetchData
