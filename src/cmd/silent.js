const process = require('process')

// Silent mode
if (process.argv.includes('-q')) {
  console.log = () => {}
  process.argv = process.argv.filter(arg => arg !== '-q')
}
