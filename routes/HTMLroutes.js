
var db = require("../models");
var axios = require('axios');
var cheerio = require('cheerio')

module.exports = function (app) {
    app.get('/view', (req, res) => {

        db.Article.find().then(function(all){
            console.log('==========================================================================================')
            
            res.render('view', {
                results: all
            }
            )
            console.log('=========================================================================================================')
        })
        /*
        var results = []
        axios.get("https://www.dissentmagazine.org/").then(function (response) {

            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);


            // Now, we grab every h2 within an article tag, and do the following:
            $("article").each(function (i, element) {

                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children('header')
                    .children("h3")
                    .text();
                result.link = $(this)
                    .children('header')
                    .children("h3")
                    .children('a')
                    .attr("href");
                result.body= $(this)
                    .children('p')
                    .text();


                results.push(result)
                console.log(result)
                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {

                    });
            });
            console.log(results)
            res.render('view', {
                results: results
            }
            )

        });

*/

    })
    app.get('/landing', (req, res) => {

        res.render('view')
    })
}