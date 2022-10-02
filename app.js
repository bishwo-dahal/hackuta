if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}
const express = require("express");
const app = express();
const Sequelize = require("sequelize-cockroachdb");

app.use("/api", require("./api"));
app.use(express.static("./static"));

const fs = require("fs");

app.listen(8080, (err) => {
  if (err) {
    console.log("GOOOOOOOOt an error");
  } else {
    console.log("Now you good");
  }
});
