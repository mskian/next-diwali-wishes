import { registerFont, createCanvas, loadImage } from "canvas"
import slugify from "slugify"

registerFont("fonts/mukta-malar-v12-latin-700.ttf", {
  family: "Mukta Malar",
})

const fetchImage = (req, res) => {
  const { user } = req.query
  // Define the canvas
  const width = 1080 // width of the image
  const height = 1080 // height of the image
  const canvas = createCanvas(width, height)
  const context = canvas.getContext("2d")

  // Define the font style
  context.textAlign = "center"
  context.textBaseline = "top"
  context.fillStyle = "#341f97"
  context.font = "32px 'Mukta Malar' bold"

  const username = user || "Generating"
  const firstletter = username.charAt(0).toUpperCase() + username.slice(1)
  const firstname = slugify(firstletter, {
    replacement: " ",
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: false,
  })

  //const random_id = Math.floor(1000 + Math.random() * 9000)
  //const basename = "user-og-image-" + random_id

  if (firstname == 0 || firstname == "") {
    loadImage("./images/diwali.png").then(image => {
      // Draw the background
      context.drawImage(image, 0, 0, 1080, 1080)

      // Draw the text
      context.fillText("Your Name", 536, 259)

      // Convert the Canvas to a buffer
      const buffer = canvas.toBuffer("image/png")

      // Set and send the response as a PNG
      res.setHeader("Content-Type", "image/png")
      res.send(buffer)
    })
  } else {
    loadImage("./images/diwali.png").then(image => {
      // Draw the background
      context.drawImage(image, 0, 0, 1080, 1080)

      // Draw the text
      context.fillText(
        firstname.replace(/[-]/g, " ") || "Hello World",
        536,
        259
      )

      // Convert the Canvas to a buffer
      const buffer = canvas.toBuffer("image/png")

      // Set and send the response as a PNG
      res.setHeader("Content-Type", "image/png")
      res.send(buffer)
    })
  }
}
export default fetchImage
