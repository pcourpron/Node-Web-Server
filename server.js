var express = require('express');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');
var db = require('./models');


var app = express();
var PORT = process.env.PORT || 3000;
//configure middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  }
  else {
    mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
  }


// Routes

app.get('/scrape',function(req,res){
    axios.get('https://www.dissentmagazine.org/').then(function(response){
        // load data into cheerio
    var $ = cheerio.load(response.data);
    
        var results =[]
        $('article').each(function(i,element){
            var result = {};

            result.title = $(this)
            .children('header')
            .children('h3')
            .text()

            result.link = $(this)
            .children('a')
            .attr('href')

            result.body = $(this)
            .children('p')
            .text()

            if (result.title !== '' && result.link !== ''&& result.body !== ''){
                db.Article.create(result)
                .then(function(dbArticle) {
                  // View the added result in the console
                  console.log(dbArticle);
                })
                .catch(function(err) {
                  // If an error occurred, send it to the client
                  return res.json(err);
                });
            }
        })

        res.send(true)
    })
    
})

app.get('/articles',function(req,res){
    db.Article.find({}).then(function(response){
        res.send(response)
    })
})

app.get('/articles/:id',function(req,res){
  db.Article.findOne({ _id: req.params.id })
  .populate("note")
  .then(function(note) {
    res.json(note);
  })
  .catch(function(err) {
    res.json(err);
  });
})

app.post('/articles/:id',function(req,res){
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(note) {
      res.json(note);
    })
    .catch(function(err) {
      res.json(err);
    });
  })

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  