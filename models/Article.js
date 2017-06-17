var mongoose = require('mongoose');  //require mongoose
var Schema = mongoose.Schema;

//create Article schema model for mongoDB
var ArticleSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    date: {
    	type: String,
    	required: true
    },
    url: {
    	type: String,
    	required: true
    }
});

//create Article model
var Article = mongoose.model('Article', ArticleSchema);

//export article for use in other files
module.exports = Article;