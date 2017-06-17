// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running ajax query to get nyt articles.
  runQuery: function(topic, yearStart, yearEnd) {

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "97465cece832491fa3bc26a21108435b",
        'q': topic,
        'begin_date': yearStart + "0101",
        'end_date': yearEnd + "0101",
        'page': 1
    });

    return axios.get(url).then(function(response) {
      var returnedArticles = response.data.response.docs;
      var articleArray = [];
      //If we get a result, return the result's
      if (returnedArticles) {
        //loop through returned array and build article objects
        for (var i = 0; i < 5; i++) {
          var articleObject = {
             title: returnedArticles[i].headline.main,
             date: returnedArticles[i].pub_date,
             turl: returnedArticles[i].web_url
          }
          //push article object to array to pass along for use
          articleArray.push(articleObject);

        }
        //return the array of objects
        return articleArray;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function retrieves the saved articles in the DB
  getSavedArticles: function() {
    return axios.get("/api/saved");
  },

  // This function posts articles to the DB for the saved list
  postSavedArticles: function(article) {
    return axios.post("/api/saved", { article: article });
  },

  //This function is used to delete an articles from being saved
  deleteSavedArticle: function(article) {
    return axios.delete("/api/saved", { data: {article: article }});
  }
};

// We export the API helper
module.exports = helper;
