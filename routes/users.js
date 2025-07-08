const express = require('express')
const router = express.Router()
const jwtCheck = require('../middleware/checkToken');
const User = require('../models/User');

// All routes will start with /users

router.post('/', (req, res) => {
  res.send('User created!')
})

router.get('/', (req, res) => {
  res.send({users: 'All users'})
})

router.get('/protected', jwtCheck, (req, res) => {
  res.send("You accessed a protected route!");
});

module.exports = router;