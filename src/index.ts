import createServer from './app'
const PORT = process.env.PORT || 3000
const app = createServer()

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} 🚀`)
})
