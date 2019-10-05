const path = require('path')
const cheerio = require('cheerio')
const transformImage = require('../transforms/image')

async function processImages (html, basedir) {
  const $ = cheerio.load(html)

  const imagePromises = []
  const imageRenders = []

  $('img').each((idx, e) => {
    const file = path.resolve(basedir, e.attribs.src)
    const image = transformImage(file, [1 / 7, 1 / 12], 80)
    console.log(file, image)
    imagePromises[idx] = image
    imagePromises[idx].then(img => { imageRenders[idx] = img })
  })

  await Promise.all(imagePromises)

  $('img').replaceWith(idx => imageRenders[idx])

  return $.html()
}

module.exports = processImages
