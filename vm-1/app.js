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

// Check connection to mongodb server
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

// Lorem ipsum text for dummy post
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// Add dummy data to database
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

// Route for creating post
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

// Home page route
app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
      });
  });
});

// Delete post route - should refactor to put
app.get("/delete/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  Post.findByIdAndDelete(requestedPostId, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
  res.redirect("/");
});

// Get specific post route
app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    console.log("post id: " + post._id);
    res.render("post", {
      id: post._id,
      title: post.title,
      content: post.content
    });
  });

});

// Get all posts route - for pdf generator
app.get("/allpost", function(req, res) {
 Post.find({}, function(err, posts){
  console.log(posts);
  res.send(posts);
  });
});


// About page route
app.get("/about", function(req, res){
  res.render("about");
});

// Compose post route
app.get("/compose", function(req, res){
  res.render("compose");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
