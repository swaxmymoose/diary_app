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

mongoose.connect("mongodb://192.168.2.12:27017/postDB", {useNewUrlParser: true});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected')
})

db.on('error', err => {
  console.error('connection error:', err)
})

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

Post.find().count(function(err, count){
  if (count === 0) {

    const post = new Post({
      title: 'Dummy Post',
      content: lorem
    });
   
    post.save(function(err){
      if (!err)
	console.log("Inserted dummy post.");
    });

  }
});

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
  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
      });
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/allpost", function(req, res) {
 Post.find({}, function(err, posts){
  console.log(posts);
  res.send(posts);
  });
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
