//for use route
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const { login } = require("../service/login");
const { register } = require("../service/register");
const { joiValidation } = require("../middleware/joiValidation");
const { registerSchema } = require("../schemas/index");
const { ensureSignedOut, ensureSignedIn } = require("../middleware/auth");

//home page
router.post("/", function (req, res, next) {
  res.send("Hello, this is API");
});

//login page
router.post("/login", ensureSignedOut, async (req, res, next) => {
  const { email, password } = req.body;
  const result = await login(email, password);

  console.log(req.session);
  //store token in session
  var token = jwt.sign({ email }, "yohohoho");
  req.session.jwt = token;

  res.json(result);
});
//register page
router.post(
  "/register",
  ensureSignedOut,
  joiValidation(registerSchema),
  async (req, res, next) => {
    const param = req.body;
    const result = await register(param);
    res.json(result);
  }
);

router.post("/logout", ensureSignedIn, async(req, res, next)=>{
    console.log(req.session);
    res.clearCookie("Token2099");
    res.json({
        success:true,
        session:req.session
    })
})

//get user by id
router.get('/user/:id', ensureSignedIn, async function(req, res, next){
    var userId = req.path.split("/user/:")[1]
    console.log(userId);
    return res.json({
        userId
    })
})

module.exports = router;
