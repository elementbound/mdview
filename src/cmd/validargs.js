const process = require('process')

if (process.argv.length < 3) {
  console.log(
`Usage: ${process.argv[1]} file

Flags:
  -q - Quiet mode
`
  )
  process.exit(1)
}
