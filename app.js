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

let username = '';
var inlist = '';
app.get("/", async(req, res) => {
    username = "khadija";
    const qyery1 =
        "SELECT title,year,genre,rating,runtime FROM `mytable` LIMIT 4";
    const qyery2 =
        "SELECT img_url,title,description FROM `mytable` LIMIT 6";


    const result = await query(qyery1);
    const result2 = await query(qyery2);
    result.forEach(element => {
        element.genre = element.genre.replace(/'/g, '');
        element.genre = element.genre.replace("[", '');
        element.genre = element.genre.replace("]", '');

    });

    res.render("index", { result, result2 });
});

app.get("/search", async(req, res) => {
    var inmylist = [];
    var i = 0;
    const search = req.query.search;

    const qyery1 =
        'SELECT * FROM mytable  WHERE title LIKE "%' + `${search}` + '%"';

    const result = await query(qyery1);
    for (var i = 0; i < result.length; i++) {

        result[i].genre = result[i].genre.replace(/'/g, '');
        result[i].genre = result[i].genre.replace("[", '');
        result[i].genre = result[i].genre.replace("]", '');
        const r = await query('SELECT title FROM mylist WHERE username="' + `${username}` + '" and title="' + `${result[i].title}` + '"');

        if (r.length > 0) {
            inmylist[i] = { isinlist: 'yes' };
        } else
            inmylist[i] = { isinlist: 'NO' };
    }
    res.json({ msg: result, inmylist: inmylist });
});

app.get("/movies", async(req, res) => {
    //routing for genres
    console.log(username);
    var inmylist = [];
    var i = 0;
    let title;
    const genre = req.query.genre ? req.query.genre : "";
    const search = req.query.search ? req.query.search : "";
    if (genre) {
        const qyery1 =
            'SELECT * FROM mytable WHERE genre LIKE "%' + `${genre}` + '%" LIMIT 18';
        console.log(qyery1);
        const result = await query(qyery1);

        for (var i = 0; i < result.length; i++) {

            result[i].genre = result[i].genre.replace(/'/g, '');
            result[i].genre = result[i].genre.replace("[", '');
            result[i].genre = result[i].genre.replace("]", '');
            const r = await query('SELECT title FROM mylist WHERE username="' + `${username}` + '" and title="' + `${result[i].title}` + '"');

            if (r.length > 0) {
                inmylist[i] = { isinlist: 'yes' };
            } else
                inmylist[i] = { isinlist: 'NO' };

        }
        res.render("movies", { result, genre: genre, search: "", inmylist: inmylist });
    } else {
        // if no genre is selected
        const qyery1 =
            "SELECT img_url,title,year,genre,users_rating FROM `mytable` LIMIT 18";

        const result = await query(qyery1);


        for (var i = 0; i < result.length; i++) {
            console.log(result[i].title);
            result[i].genre = result[i].genre.replace(/'/g, '');
            result[i].genre = result[i].genre.replace("[", '');
            result[i].genre = result[i].genre.replace("]", '');
            const r = await query('SELECT title FROM mylist WHERE username="' + `${username}` + '" and title="' + `${result[i].title}` + '"');

            if (r.length > 0) {
                inmylist[i] = { isinlist: 'yes' };
            } else
                inmylist[i] = { isinlist: 'NO' };
        }
        console.log(inmylist);



        res.render("movies", { result, genre: "allgenres", search: "", inmylist: inmylist });
    }
});



app.get("/movie/search", async(req, res) => {
    //routing for title
    const search = req.query.search;
    var inmylist = [];
    var i = 0;
    const qyery1 =
        'SELECT * FROM mytable  WHERE title LIKE "%' + `${search}` + '%" LIMIT 18';


    const result = await query(qyery1);
    for (var i = 0; i < result.length; i++) {

        result[i].genre = result[i].genre.replace(/'/g, '');
        result[i].genre = result[i].genre.replace("[", '');
        result[i].genre = result[i].genre.replace("]", '');
        const r = await query('SELECT title FROM mylist WHERE username="' + `${username}` + '" and title="' + `${result[i].title}` + '"');

        if (r.length > 0) {
            inmylist[i] = { isinlist: 'yes' };
        } else
            inmylist[i] = { isinlist: 'NO' };
    }
    res.render("movies", { result, search: search, genre: "allgenres", inmylist: inmylist });

});

app.get("/filter", async(req, res) => {
            let sqlQueryString;
            var inmylist = [];
            var i = 0;
            const genre = req.query.Genre;

            const year = req.query.Released_Year ?
                req.query.Released_Year.split("-") :
                "";
            const filters = {
                    genre: `${
      genre
        ? genre === "All genres"
          ? ""
          : 'genre LIKE "%' + `${genre}` + '%"'
        : ""
    }`,
    year: `${
      year
        ? year[0] === "allyears"
          ? ""
          : "year BETWEEN " + `${year[0]}` + " and " + `${year[1]}`
        : ""
    }`,
  };

  if (filters.genre && filters.year) {
    sqlQueryString =
      'SELECT img_url,title,year,genre,users_rating from mytable where ' +
      `${filters.genre}` +
      " and " +
      `${filters.year}`;
  } else if (filters.genre.length == 0 && filters.year.length == 0) {
    sqlQueryString =
    'SELECT img_url,title,year,genre,users_rating from mytable ';
  } else {
    sqlQueryString =
      "SELECT img_url,title,year,genre,users_rating from `mytable` where " +
      `${filters.genre}` +
      `${filters.year}`;
  }

  sqlQueryString +=  ` LIMIT 18 `;

  const result = await query(sqlQueryString);
  for (var i = 0; i < result.length; i++) {

    result[i].genre = result[i].genre.replace(/'/g, '');
    result[i].genre = result[i].genre.replace("[", '');
    result[i].genre = result[i].genre.replace("]", '');
    const r = await query('SELECT title FROM mylist WHERE username="' + `${username}` + '" and title="' + `${result[i].title}` + '"');

    if (r.length > 0) {
        inmylist[i] = { isinlist: 'yes' };
    } else
        inmylist[i] = { isinlist: 'NO' };
}
  res.json({ msg: result , inmylist: inmylist });

});


app.get('/loadmore', async(req, res) =>{
    var limit =req.query.lIMIT;
    var offset=req.query.offset;
    var inmylist = [];
    var i = 0;
    let sqlQueryString=  'SELECT img_url,title,year,genre,users_rating from mytable LIMIT ' +
    `${limit}` +
    " OFFSET " +
    `${offset}`;
    const result = await query(sqlQueryString);
    for (var i = 0; i < result.length; i++) {

        result[i].genre = result[i].genre.replace(/'/g, '');
        result[i].genre = result[i].genre.replace("[", '');
        result[i].genre = result[i].genre.replace("]", '');
        const r = await query('SELECT title FROM mylist WHERE username="' + `${username}` + '" and title="' + `${result[i].title}` + '"');

        if (r.length > 0) {
            inmylist[i] = { isinlist: 'yes' };
        } else
            inmylist[i] = { isinlist: 'NO' };
    }
    res.json({ msg: result , inmylist: inmylist });

    });

    app.get('/addtolist', async(req, res) =>{
        console.log("yeahhh");
        let sqlQueryString;
        var title =req.query.title;
        var isinmylist =req.query.isinmylist;

        if(isinmylist==='NO'){
          sqlQueryString=  'INSERT INTO `mylist`(`username`, `title`) VALUES ("' +
            `${username}` +
            '","' +
            `${title}`+'")';
        }
        else
         sqlQueryString=  'DELETE FROM `mylist` WHERE username="' +
            `${username}` +
            '" and title="' +
            `${title}`+'"';
        const result = await query(sqlQueryString);
        res.json({ msg:'success' });

        });

app.listen(3000, () => {
    console.log("ruunig on 3000");
});