const express = require("express");
const {
  getHomeData,
  getMoviesData,
  getSearchData,
  getMovieByTitle,
} = require("../services/service");
const _ = require("lodash");
const app = require("../app");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("you reached here");
  try {
    const [carousalData, likedData] = await getHomeData();

    res.status(200).json({ carousalData, likedData });
  } catch (e) {
    next(e);
  }
});

router.get("/movies", async (req, res, next) => {
  console.log("you reached /movies");
  try {
    const data = await getMoviesData(req.query);

    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});
router.get("/search", async (req, res, next) => {
  const q = req.query.q;
  try {
    const data = await getSearchData(q);

    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.get("/movies/:title", async (req, res, next) => {
  const title = req.params.title;
  console.log(title);

  try {
    const data = await getMovieByTitle(title);
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
