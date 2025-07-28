const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  const users = await User.find({},'-password')
  res.render('users/index.ejs', {
    users: users,
    user:req.session.user
  });
});
router.get('/', async (req, res) => {
  const users = await User.find({},'-password')
  res.render('users/index.ejs', {
    users: users,
    user:req.session.user
  });
});

module.exports = router;
