// required NPM dependencies
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan'); // HTTP request logger middleware for Node.js. Logs requests to the application. It's a helper that collects request logs from the server
const bodyParser = require('body-parser'); // this allows express to read the body and parse the data into a JSON object
const axios = require('axios'); // used to send asynchronous HTTP request to REST endpoints and perform CRUD operations

// scraper utility
const cheerio = require('cheerio');

// this pulls in the models from the models folder
const db = require('./models');

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

// route for scraping and then creating associated database entries
app.get("/scraping", function(req, res) {
    axios.get("http://www.echojs.com/")
    .then(function(response) {
        const $ = cheerio.load(response.data);
       res.send(response.data)

    $("article h2").each(function(i, element) {

        // empty result object 
        let result = {};

        result.title = $(this)
            .children("a")
            .text();
        result.link = $(this)
            .children("a")
            .attr("href");

        console.log("result title = " + result.title + " result link = " + result.link);
    // console.log(result);

    // use the result object to create new articles that were gathered during scraping
        db.Article.create(result)
        .then(function(dbArticle) {
            console.log("this is the dbArticle create log " + dbArticle);
        }).catch(function(err) {
            return res.json("this is the error log " + err);
        });
    });
    // console.log("result = " + result.title);
        res.send("All articles have been scraped");

    });
});

// this route displays all of the articles from the database
app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// this route gets an article by the ID and then populates it with any associated notes
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })
})

// this route saves / updates and articles's note
app.post("/articles/:id", function(req, res) {
    db.Notes.create(req.body)
    .then(function(dbNote) {
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { Notes: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});


app.listen(port, function() {
    console.log("The application is running on port " + port);
});