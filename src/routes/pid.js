const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200)
    .send('' + process.pid)
})

module.exports = router
