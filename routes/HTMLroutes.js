
var db = require("../models");
var axios = require('axios');
var cheerio = require('cheerio')

module.exports = function (app) {
    app.get('/', (req, res) => {

        db.Article.find().then(function(all){
            console.log('==========================================================================================')
            
            res.render('view', {
                results: all
            }
            )
            console.log('=========================================================================================================')
        })
       

    })
    app.get('/landing', (req, res) => {

        res.render('view')
    })
}