const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

const cors = require("cors");
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//define routs
app.use('/', require('./routes/auth.route'));
app.use('/', require('./routes/movies.route'));
// app.use('/signup', require('./routes/auth.route'));
// app.use('/login', require('./routes/auth.route'));


// app.use('/login/save', require('./routes/auth.route'));
// app.use('/PopCorn', require('./routes/auth.route'));
// app.use('/edit', require('./routes/auth.route'));
// app.use('/ques', require('./routes/auth.route'));
// app.use('/Sendques', require('./routes/auth.route'));
// app.use('Profile', require('./routes/auth.route'));
// app.use('/Home', require('./routes/auth.route'))
//     //--------------
// app.use('/search', require('./routes/movies.route'));
// app.use('/movies', require('./routes/movies.route'));
// app.use('/movie/search', require('./routes/movies.route'));
// app.use('/filter', require('./routes/movies.route'));
// app.use('/moviepage', require('./routes/movies.route'));
// app.use('/mylist', require('./routes/movies.route'));
// app.use('/loadlist', require('./routes/movies.route'));
// app.use('/addtolist', require('./routes/movies.route'))


app.listen(3000, () => {
    console.log("ruunig on 3000");
});