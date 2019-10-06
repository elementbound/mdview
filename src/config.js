const path = require('path')

require('dotenv-defaults').config({
  default: path.resolve(__dirname, '../.env.defaults')
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

const config = Object.freeze({
  port: getInt('MDSERVE_PORT'),
  timeout: getNumber('MDSERVE_TIMEOUT'),
  timeoutInterval: getNumber('MDSERVE_TIMEOUT_INTERVAL'),
  renderImages: getBool('MDSERVE_RENDER_IMAGES')
})

console.log('Loaded config', JSON.stringify(config, undefined, 4))

module.exports = config
