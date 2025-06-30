const express = require('express')
const router = express.Router()

// All routes will start with /users

router.post('/', (req, res) => {
  res.send('User created!')
})


module.exports = router;