const express = require('express')
const fs = require('fs')
const fsp = fs.promises

const transformMarkdown = require('../transforms/markdown')

const router = express.Router()

router.get('/*', async (req, res) => {
  const file = req.path

  if (!fs.existsSync(file)) {
    res.status(404)
      .send(`File doesn't exist: ${file}`)
  }

  const data = await fsp.readFile(file, 'utf-8')
  const result = transformMarkdown(data)

  res.status(200)
    .send(result)
})

module.exports = router
