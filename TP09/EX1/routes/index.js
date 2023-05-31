var express = require('express');
var router = express.Router();
const { login } = require('../services/login')
const { register } = require('../services/register')


router.post('/', function (req, res, next) {
  console.log("Router Working");
  res.send("Hello From APIs");
})

router.post('/login', async(req, res, next) => {
  const { email, password } = req.body;
  const result =await login(email, password);
  res.json(result);
})

router.post('/register', async(req, res, next) => {
  
  const createdUser = await register(req.body)
  res.json(createdUser);
})

module.exports = router