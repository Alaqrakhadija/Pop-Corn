const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const query = require("./config/database");
const { YEAR } = require("mysql/lib/protocol/constants/types");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(cors());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const qyery1 =
    "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating,Runtime FROM `imdb_top_1000` LIMIT 4";
  const qyery2 =
    "SELECT Poster_Link,Series_Title,Overview FROM `imdb_top_1000` LIMIT 6";

  // pool.getConnection((err, connection) => {

  //     if (err) return;

  //     connection.query(qyery, (err, result) => {
  //         console.log(result);
  //         result1 = result

  //     })

  // })

  const result = await query(qyery1);
  const result2 = await query(qyery2);

  console.log(result);
  res.render("index", { result, result2 });
});

app.get("/movies", async (req, res) => {
  //routing for genres
  const genre = req.query.genre;
  if (genre) {
    const qyery1 =
      'SELECT * FROM imdb_top_1000  WHERE Genre LIKE "%' + `${genre}` + '%"';

    const result = await query(qyery1);

    res.render("movies", { result, genre: genre });
  } else {
    // if no genre is selected
    const qyery1 =
      "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating FROM `imdb_top_1000` LIMIT 18";

    const result = await query(qyery1);

    res.render("movies", { result, genre: "allgenres" });
  }
});

app.get("/filter", async (req, res) => {
  let sqlQueryString;
  const genre = req.query.Genre;
  const year = req.query.Released_Year
    ? req.query.Released_Year.split("-")
    : "";
  const filters = {
    genre: `${
      genre
        ? genre === "all genres"
          ? ""
          : 'Genre LIKE "%' + `${genre}` + '%"'
        : ""
    }`,
    year: `${
      year
        ? year[0] === "allyears"
          ? ""
          : "Released_Year BETWEEN " + `${year[0]}` + " and " + `${year[1]}`
        : ""
    }`,
  };
  console.log(filters.genre + "   " + filters.year);
  if (filters.genre && filters.year) {
    sqlQueryString =
      "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating from `imdb_top_1000` where " +
      `${filters.genre}` +
      " and " +
      `${filters.year}`;
  } else if (filters.genre.length == 0 && filters.year.length == 0) {
    sqlQueryString =
      "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating from `imdb_top_1000`";
  } else {
    sqlQueryString =
      "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating from `imdb_top_1000` where " +
      `${filters.genre}` +
      `${filters.year}`;
  }

  sqlQueryString += " LIMIT 18";

  const result = await query(sqlQueryString);
  res.json({ msg: result });
  console.log(sqlQueryString);
  console.log(result);
});

app.listen(3000, () => {
  console.log("ruunig on 3000");
});
