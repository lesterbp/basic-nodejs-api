const generateGreeting = async () => ({ hello: 'world1' })

exports.getTerms = async (req, res) => {
  const greeting = await generateGreeting()
  res.json(greeting)
}