
'use strict'
const router = require('express').Router()

router.get('/healthCheck', async (req, res) => {
  return res.send({
    message: 'All Okay'
  })
})

module.exports = router