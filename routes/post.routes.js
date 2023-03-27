const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../model/post.model");
var jwt = require("jsonwebtoken");

// Read
postRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  // console.log(token);
  const decoded = jwt.verify(token, "shhhhh");

  try {
    if (decoded) {
      const posts = await PostModel.find({ userID: decoded.userID });
      res.status(200).send(posts);
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Create
postRouter.post("/add", async (req, res) => {
  try {
    const payload = req.body;
    // console.log(payload);
    const new_post = new PostModel(payload);
    await new_post.save();
    res.status(200).send({ msg: "A new post has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Update
postRouter.patch("/update/:postID", async (req, res) => {
  const { postID } = req.params;
  const data = req.body;
  // console.log(postID,payload)
  try {
    await PostModel.findByIdAndUpdate({ _id: postID }, data);
    res.status(200).send({ msg: "post details has been updated" });
  } catch (error) {
    res.status(400).send({ msg: err.message });
  }
});

// Delete
postRouter.delete("/delete/:postID", async (req, res) => {
  const { postID } = req.params;
  // console.log(postID);
  try {
    await PostModel.findByIdAndDelete({ _id: postID });
    res.status(200).send({ msg: "post has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { postRouter };

// {
//     "title": "Node",
//     "body": "learning",
//     "device": "Laptop",
//     "no_of_comments": 15
//   }
