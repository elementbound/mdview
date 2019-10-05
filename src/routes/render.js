const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const express = require('express')

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
  let html = transformMarkdown(data)
  html = await processImages(html, basedir)

  res.status(200)
    .send(html)
})

module.exports = router
