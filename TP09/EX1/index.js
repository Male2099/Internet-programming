const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

require('./configs/db')();

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


app.use(require('./routes'))

app.listen(process.env.PORT || 3001, () => console.log('App avaiable on http://localhost:3001'))

