// Author: Thomas Roff

const PDFDocument = require("pdfkit");
const fs = require("fs");
const axios = require("axios");
const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("/vagrant/vm-3/report.pdf"));

doc.registerFont("Inconsolata", "/vagrant/vm-3/Inconsolata-Regular.ttf");

async function getPosts(callback) {
  try {
    let res = await axios.get(`http://192.168.2.11:3000/allpost`);
    if (res.status == 200) {
      console.log(res.status);
    }
    callback(returnPosts(res.data));
  } catch (err) {
    console.error(err);
  }
}

function returnPosts(posts) {
  return posts;
}

getPosts(function(posts) {
  console.log(posts);
  posts.forEach(function(post) {
    doc
      .font("Inconsolata")
      .text(" " + post.title + ": " + post.content);

    doc
      .font("Inconsolata")
      .fontSize(12)
      .text(" ");
  });

  // Finalize PDF file
  doc.end();
});
