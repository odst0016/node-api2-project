const express = require("express");
const cors = require("cors");

const server = express();
const postsRouter = require("./data/posts/posts-router");
server.use(express.json());

server.get("/", cors(), (req, res) => {
  res.send(`server is up`);
});

server.use("/api/posts", cors(), postsRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
