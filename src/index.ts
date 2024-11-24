import createServer from './app'
import { logger } from './logger/httpLogger'
const PORT = process.env.PORT || 3000
const app = createServer()

app.listen(PORT, async () => {
  logger.info(`Server is running on port : ${PORT} at ${new Date()} `)
  console.log(`Server is running on port ${PORT} 🚀`)
})
