const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1); // trust first proxy
require("./configs/db")();
app.use(require("./routes/route"));

app.listen(port, () => {
  console.log("server running on http://localhost:" + port);
});
