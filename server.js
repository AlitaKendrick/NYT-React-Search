//dependencies
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Article = require("./models/Article.js");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect('mongodb://localhost/nytHomework19');

var db = mongoose.connection;

//mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

//mongoose success
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// **ROUTES**

//show main
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

//get saved
app.get('/api/saved', function(req, res) {
  Article.find({}).exec(function(err, doc) {
	if (err) { 
	  console.log(err);
	} else {
		res.send(doc);
	}
  });
});

//post saved
app.post('/api/saved', function(req, res) {
  Article.create({
	title: req.body.article.title,
	date: req.body.article.date,
	url: req.body.article.turl,
  }, function(err) {
	if (err) {
	  console.log(err);
	} else {
	  res.send("Saved Article");
  }
  });
});

//delete saved
app.delete('/api/saved', function(req, res) {
  Article.remove({
	_id: req.body.article._id
  }, function(err) {
	if (err) {
	  console.log(err);
	} else {
	  res.send("Deleted Article");
	}
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});