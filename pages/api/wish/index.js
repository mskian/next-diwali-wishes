export default function handler(req, res) {
  const crushname = [
    {
      content: "Greetings",
      slug: "Greetings",
    },
  ]
  res.status(200).json(crushname)
}
