const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const { auth } = require("./middleware/auth");
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Check");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("mongodb connect");
    console.log("server start");
  } catch (error) {
    console.log(error);
  }
});
