const express = require('express')
const app = express()

const PORT = 3000

function setupRouters () {
  const ping = require('./routes/ping')

  console.log('Registering ping')
  app.use('/ping', ping)
}

function main () {
  setupRouters()

  console.log(`Listening on port ${PORT}`)
  app.listen(PORT)
}

main()
