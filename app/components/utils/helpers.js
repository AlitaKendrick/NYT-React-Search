var axios = require("axios");
var helper = {
 runQuery: function(topic, yearStart, yearEnd) {
   var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "97465cece832491fa3bc26a21108435b",
        'q': topic,
        'begin_date': yearStart + "0101",
        'end_date': yearEnd + "0101",
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
  },  

  getSavedArticles: function() {
    return axios.get("/api/saved");
  },
  
  postSavedArticles: function(article) {
    return axios.post("/api/saved", { article: article });
  },

  deleteSavedArticle: function(article) {
    return axios.delete("/api/saved", { data: {article: article }});
  }
};

module.exports = helper;
