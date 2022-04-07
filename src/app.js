const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");

const app = express();
const { dirname } = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));

const apiRoutes = require("./routes/Api");

app.use("/api", apiRoutes);

app.use("/*", async (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).send("No Match Found");
});

module.exports = app;
