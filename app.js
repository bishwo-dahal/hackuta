if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}
const express = require("express");
const app = express();
const Sequelize = require("sequelize-cockroachdb");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());

app.use(express.static("./static"));

app.use("/api", require("./api"));

const fs = require("fs");

app.listen(8080, (err) => {
  if (err) {
    console.log("GOOOOOOOOt an error");
  } else {
    console.log("Now you good");
  }
});
