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
    res.status(200).json(crushname)
  } else {
    const crushname = [
      {
        content: seo_title.replace(/[-]/g, " ") || "Hello World",
        slug: seo_title || "Hello World",
      },
    ]
    res.status(200).json(crushname)
  }
}

export default fetchData
