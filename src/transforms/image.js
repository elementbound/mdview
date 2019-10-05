const path = require('path')
const readline = require('readline')
const exec = require('child_process').exec

const GRADIENT = ' .:-=+*#%@'

function encodePos (x, y) {
  return `${x},${y}`
}

function createImage () {
  return {
    width: 0,
    height: 0,
    data: {}
  }
}

/**
 * Parses an imagemagick text line into a pixel
 * @param {string} line line
 */
function parseLine (line) {
  const LINE_FORMAT = /\s*(\d+),(\d+):\s*\(\d+,\d+,\d+\)\s*#[\d\w]+\s*srgb\((\d+),(\d+),(\d+)\)\s*/
  const result = LINE_FORMAT.exec(line)

  if (result == null) {
    return undefined
  } else {
    return {
      x: +result[1],
      y: +result[2],

      r: +result[3],
      g: +result[4],
      b: +result[5]
    }
  }
}

function convert (file, scaleX, scaleY, maxSize) {
  return new Promise((resolve, reject) => {
    const scriptFile = path.join(__dirname, '..', 'sh/resize.sh')

    const child = exec([scriptFile, file, scaleX, scaleY, maxSize].join(' '))
    const image = createImage()

    const rl = readline.createInterface({
      input: child.stdout
    })

    rl.on('line', line => {
      const pixel = parseLine(line)

      if (!pixel) {
        console.log('[skip]', line)
        return
      } else {
        // console.log('[match]', line)
      }

      image.width = Math.max(pixel.x + 1, image.width)
      image.height = Math.max(pixel.y + 1, image.height)
      image.data[encodePos(pixel.x, pixel.y)] = pixel
    })

    rl.on('close', () => {
      console.log('im::convert close')
      resolve(image)
    })
  })
}

async function transformImage (file, scale, maxWidth) {
  const image = await convert(file, `${scale[0] * 100}%`, `${scale[1] * 100}%`, maxWidth)

  let result = ''
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const pixel = image.data[encodePos(x, y)]

      if (!pixel) {
        console.log('[undefined]', x, y)
        result += ' '
        continue
      }

      const value = Math.max(pixel.r, pixel.g, pixel.b) / 255
      const char = GRADIENT[0 | ((GRADIENT.length - 1) * value)]

      result += char
    }

    result += '\n'
  }

  return `<pre>${result}</pre>`
}

module.exports = transformImage
