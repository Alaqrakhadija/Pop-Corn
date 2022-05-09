const router = require("express").Router();
const bodyParser = require("body-parser");
const moviesController = require('../controllers/movies.controller');
const http = require('http');


router.get("/search", moviesController.Search);
router.get("/movies", moviesController.movies);
router.get("/movie/search", moviesController.serchMovies);
router.get("/filter", moviesController.filter);
router.get('/moviepage', moviesController.moviePage);
router.get("/mylist", moviesController.myList);
router.get('/loadlist', moviesController.loadList);
router.get('/addtolist', moviesController.addtoList);
router.get('/charts', moviesController.charts);
router.get('/loadchart', moviesController.loadchart);
module.exports = router;