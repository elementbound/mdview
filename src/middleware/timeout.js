const config = require('../config')

const TIMEOUT = config.timeout
const CHECK_INTERVAL = config.timeoutInterval

let lastRequest = new Date()

function recordRequest (req, res, next) {
  lastRequest = new Date()
  next()
}

setInterval(() => {
  if (new Date() - lastRequest > TIMEOUT) {
    console.log(`No request in the last ${TIMEOUT} ms, quitting`)
    process.exit()
  }
}, CHECK_INTERVAL)

module.exports = recordRequest
