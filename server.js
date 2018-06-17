// required NPM dependencies
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser'); // this allows express to read the body and parse the data into a JSON object

// scraper utility
const cheerio = require('cheerio');

// this pulls in the models from the models folder
// const db = require('./models');

// define a port to run the app on
const port = 3000;

// initialize the Express server
const app = express();

// this middleware processes requests to the server and logs requests to the console
app.use(morgan('dev'));

//app.use('/, function(req, res) {
//    res.send('express program working')
// })

// this sets up the app to use body parser to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/mongodbnews');

app.listen(port, function() {
    console.log("The application is running on port " + port);
});