const express = require("express");
const app = express();
const waifuRouter = require("./routes/router");

app.get("/", (req, res) => {
  res.end("hello server");
});

app.use("/waifu", waifuRouter);
//Create a server
app.listen(8000, () => {
  console.log("server has been started");
});
