//for use route
var express = require('express');
var router = express.Router();

const { login } = require('../service/login');
const { register } = require('../service/register')
const { joiValidation } = require('../middleware/joiValidation');
const { loginSchema, registerSchema } = require('../schemas/index')


//home page 
router.get('/', function(req,res,next) {
    res.send("Hello, this is API");
});

//login page
router.post('/login' ,joiValidation(loginSchema) ,async (req,res,next)=> {
    const {email, password} = req.body;
    const result = await login(email, password);
    res.json(result);
});
//register page
router.post('/register', joiValidation(registerSchema), async (req,res,next)=> {
    const param = req.body
    const result = await register(param);
    res.json(result);
});

module.exports = router;