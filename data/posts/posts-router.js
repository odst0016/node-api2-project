const express = require("express");
const { findById } = require("../db");

const Posts = require("../db");

const router = express.Router();
//returns all posts
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((error) => {
      res.status(500).json({ message: "Posts not found" });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving post." });
    });
});

router.post("/", (req, res) => {
  if (req.body.title && req.body.contents) {
    Posts.insert(req.body)
      .then((post) => {
        Posts.findById(post.id).then((newPost) => {
          res.status(201).json(newPost);
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error adding post!" });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
});

module.exports = router;
