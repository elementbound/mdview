const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const express = require('express')
const cheerio = require('cheerio')

const transformMarkdown = require('../transforms/markdown')
const transformImage = require('../transforms/image')

const router = express.Router()

router.get('/*', async (req, res) => {
  const file = req.path
  const basedir = path.dirname(file)
  console.log('Rendering', file)

  if (!fs.existsSync(file)) {
    res.status(404)
      .send(`File doesn't exist: ${file}`)
  }

  const data = await fsp.readFile(file, 'utf-8')
  const html = transformMarkdown(data)

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

  res.status(200)
    .send($.html())
})

module.exports = router
