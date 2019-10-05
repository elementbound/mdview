const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const PORT = 3000

function setupRouters () {
  const routesDir = path.resolve(__dirname, 'routes')

  fs.readdirSync(routesDir)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const name = path.basename(file, '.js')
      const filePath = path.resolve(routesDir, file)

      console.log(`Loading route named ${name} from file: ${filePath}`)

      return [name, require(filePath)]
    })
    .forEach(([name, mod]) => {
      console.log(`Registering route: ${name}`)
      app.use(`/${name}`, mod)
    })
}

function main () {
  setupRouters()

  console.log(`Listening on port ${PORT}`)
  app.listen(PORT)
}

main()
