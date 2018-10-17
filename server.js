var express = require("express");
var mongoose = require("mongoose");

//scraping files 
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000
// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });


const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')


require('./routes/POSTroutes.js')(app);
require('./routes/HTMLroutes.js')(app);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
