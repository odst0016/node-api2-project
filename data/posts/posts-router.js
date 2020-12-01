const express = require("express");
const { findById } = require("../db");

const Posts = require("../db");

const router = express.Router();
//GET posts
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((error) => {
      res.status(500).json({ message: "Posts not found" });
    });
});
//Get post by id
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
//get post comments by post id
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id).then((comment) => {
    if (comment.length > 0) {
      res.status(200).json(comment);
    } else {
      res.status(500).json({ message: "Comments not found" });
    }
  });
});
//Post Requests
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

router.post("/:id/comments", (req, res) => {
  const post_id = req.params.id;
  const comment = {
    text: req.body.text,
    post_id: post_id,
  };
  Posts.insertComment(comment)
    .then((comment) => {
      res.status(201).json({ data: comment });
    })
    .catch((error) => {
      res.status(500).json({ message: "Comment could not be added" });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      if (post >= 1) {
        res.status(200).json({ message: "The Post has been deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The Post could not be deleted/found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error performing requested operation" });
    });
});

router.put("/:id", (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      if (post > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post could not be updated" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          message: "Ran into an error could not perform requested operation.",
        });
    });
});
module.exports = router;
