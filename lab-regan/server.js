'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('product:server');
const mongoose = require('mongoose');
const proRouter = require('./router/product-router.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/exampleStore';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.use(cors());
app.use(morgan('dev'));
app.use(proRouter);
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
