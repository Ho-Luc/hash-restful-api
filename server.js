'use strict'

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var mongoose = require('mongoose');

let publicRouter = express.Router();
let apiRouter = express.Router();

mongoose.connect('mongodb://localhost/db');
app.use(bodyParser.json());

require('./routes/login')(publicRouter);
require('./routes/userRoute')(apiRouter)

app.use('/public', publicRouter);
app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('started on 3000');
})
