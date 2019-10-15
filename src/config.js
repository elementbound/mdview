const path = require('path')

require('dotenv-defaults').config({
  path: path.resolve(__dirname, '../.env.defaults')
})

function getInt (name) {
  return ~~process.env[name]
}

function getNumber (name) {
  return +process.env[name]
}

function getBool (name) {
  return process.env[name] === 'true'
}

function getList (name) {
  return process.env[name].split(',')
    .map(item => item.trim())
}

function getString (name) {
  return process.env[name]
}

const config = Object.freeze({
  port: getInt('MDSERVE_PORT'),
  timeout: getNumber('MDSERVE_TIMEOUT'),
  timeoutInterval: getNumber('MDSERVE_TIMEOUT_INTERVAL'),
  renderImages: getBool('MDSERVE_RENDER_IMAGES'),
  extensions: getList('MDSERVE_EXTENSIONS'),
  browser: getString('MDVIEW_BROWSER')
})

console.log('Loaded config', JSON.stringify(config, undefined, 4))

module.exports = config
