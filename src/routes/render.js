const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const express = require('express')

const config = require('../config')
const transformMarkdown = require('../transforms/markdown')
const processImages = require('../postprocess/image')

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
  const extension = path.extname(file)

  if (config.extensions.includes(extension)) {
    let html = transformMarkdown(data)

    html = config.renderImages
      ? await processImages(html, basedir)
      : html

    res.status(200)
      .send(html)
  } else {
    console.log(`Unknown extension ${extension}, passing through`)

    res.status(200)
      .contentType('text/plain')
      .send(`${data}`)
  }
})

module.exports = router
