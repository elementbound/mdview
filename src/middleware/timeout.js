const TIMEOUT = 60 * 60 * 1000
const CHECK_INTERVAL = 60 * 60 * 1000

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
