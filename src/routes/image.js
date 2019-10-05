const express = require('express')
const fs = require('fs')

const transformImage = require('../transforms/image')

const router = express.Router()

router.get('/*', async (req, res) => {
  const file = req.path

  if (!fs.existsSync(file)) {
    res.status(404)
      .send(`File doesn't exist: ${file}`)
  }

  const result = await transformImage(file, [1 / 7, 1 / 12], 80)

  res.status(200)
    .send(result)
})

module.exports = router
