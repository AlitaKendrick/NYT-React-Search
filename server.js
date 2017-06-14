//server dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//add in schema to require
// var X = require("./models/");

//creating an express app
var app = express();
var PORT = process.env.PORT || 3000;

//running Morgan for logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));


//mongodb config
mongoose.connect("mongodb://localhost/homework19");
var db = mongoose.connection;

db.on("error", function(err) {
	console.log("Mongoose Error: ", err);
});

db.once("open", function() {
	console.log("Mongoose connection successful");
});


//main route to redirect to rendered react app
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});




app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
})

