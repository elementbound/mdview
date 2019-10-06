const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.MDSERVE_PORT || 3000

function listModules (directory) {
  return fs.readdirSync(directory)
    .filter(file => file.endsWith('.js'))
    .map(file => ({
      name: path.basename(file, '.js'),
      file: path.resolve(directory, file)
    }))
}

function setupMiddleware () {
  const middlewareDir = path.resolve(__dirname, 'middleware')

  listModules(middlewareDir).forEach(({ name, file }) => {
    console.log(`Loading middleware named ${name} from file: ${file}`)
    app.use(require(file))
  })
}

function setupRouters () {
  const routesDir = path.resolve(__dirname, 'routes')

  listModules(routesDir).forEach(({ name, file }) => {
    console.log(`Loading route /${name} from file: ${file}`)
    app.use(`/${name}`, require(file))
  })
}

function main () {
  setupMiddleware()
  setupRouters()

  console.log(`Listening on port ${PORT}`)
  app.listen(PORT, '127.0.0.1')
}

main()
