var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");

var app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cow",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, //2h
      sameSite: true,
      secure: false,
    },name:"Token2099"
  })
);

require("./config/db")();
app.use(require("./routes"));

app.listen(port, () => console.log(`App on http://localhost:${port}`));
