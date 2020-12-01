const express = require("express");

const Posts = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("its working");
});

module.exports = router;
