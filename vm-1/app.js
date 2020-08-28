// Author: Thomas Roff

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const dbConnection = mongoose.createConnection("mongodb://192.168.2.12:27017/postDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (err)
      res.status(500).json(ex); 

    console.log("Document inserted succussfully!");
    res.redirect("/");
   });

});

app.get("/", function(req, res){
  res.render("home");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
