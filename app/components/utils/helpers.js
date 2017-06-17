// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running ajax query to get nyt articles.
  runQuery: function(topic, yearStart, yearEnd) {

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
        'q': topic,
        'begin_date': yearStart + "0101",
        'end_date': yearEnd + "0101",
        'page': 1
    });

    return axios.get(url).then(function(response) {
      var returnedArticles = response.data.response.docs;
      var articleArray = [];
            if (returnedArticles) {
        for (var i = 0; i < 5; i++) {
          var articleObject = {
             title: returnedArticles[i].headline.main,
             date: returnedArticles[i].pub_date,
             turl: returnedArticles[i].web_url
          }
           articleArray.push(articleObject);

        }    return articleArray;
      }    return "";
    });
  },  getSavedArticles: function() {
    return axios.get("/api/saved");
  },
  postSavedArticles: function(article) {
    return axios.post("/api/saved", { article: article });
  },
  deleteSavedArticle: function(article) {
    return axios.delete("/api/saved", { data: {article: article }});
  }
};

// We export the API helper
module.exports = helper;
