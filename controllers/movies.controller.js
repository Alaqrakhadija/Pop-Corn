const bcrypt = require('bcryptjs');
var url = require('url');
const query = require("../models/database");
var emailforqu = '';
var inlist = '';
var first = 1;

const session = require("../app");

exports.Search = async function(req, res) {

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
        const r = await query('SELECT title FROM mylist WHERE username="' + `${req.session.email}` + '" and title="' + `${result[i].title}` + '"');

        if (r.length > 0) {
            inmylist[i] = { isinlist: 'yes' };
        } else
            inmylist[i] = { isinlist: 'NO' };
    }
    res.json({ msg: result, inmylist: inmylist });

}

exports.movies = async function(req, res) {
    if (req.session.email) {
        //routing for genres

        var inmylist = [];
        var i = 0;
        let title;
        const genre = req.query.genre ? req.query.genre : "";
        const search = req.query.search ? req.query.search : "";
        if (genre) {
            const qyery1 =
                'SELECT * FROM mytable WHERE genre LIKE "%' + `${genre}` + '%" LIMIT 18';

            const result = await query(qyery1);

            for (var i = 0; i < result.length; i++) {

                result[i].genre = result[i].genre.replace(/'/g, '');
                result[i].genre = result[i].genre.replace("[", '');
                result[i].genre = result[i].genre.replace("]", '');
                const r = await query('SELECT title FROM mylist WHERE username="' + `${req.session.email}` + '" and title="' + `${result[i].title}` + '"');

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

                result[i].genre = result[i].genre.replace(/'/g, '');
                result[i].genre = result[i].genre.replace("[", '');
                result[i].genre = result[i].genre.replace("]", '');
                const r = await query('SELECT title FROM mylist WHERE username="' + `${req.session.email}` + '" and title="' + `${result[i].title}` + '"');

                if (r.length > 0) {
                    inmylist[i] = { isinlist: 'yes' };
                } else
                    inmylist[i] = { isinlist: 'NO' };
            }




            res.render("movies", { result, genre: "allgenres", search: "", inmylist: inmylist });
        }
    } else {
        res.redirect("/PopCorn",

        );
    }
}
exports.serchMovies = async function(req, res) {
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
        const r = await query('SELECT title FROM mylist WHERE username="' + `${req.session.email}` + '" and title="' + `${result[i].title}` + '"');

        if (r.length > 0) {
            inmylist[i] = { isinlist: 'yes' };
        } else
            inmylist[i] = { isinlist: 'NO' };
    }
    res.render("movies", { result, search: search, genre: "allgenres", inmylist: inmylist });

}
exports.filter = async function(req, res) {

        let sqlQueryString;
        var inmylist = [];
        var i = 0;
        const genre = req.query.Genre;
        const offset = req.query.offset;
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

sqlQueryString +=  ` LIMIT 18 OFFSET ${offset}`;

const result = await query(sqlQueryString);
for (var i = 0; i < result.length; i++) {

result[i].genre = result[i].genre.replace(/'/g, '');
result[i].genre = result[i].genre.replace("[", '');
result[i].genre = result[i].genre.replace("]", '');
const r = await query('SELECT title FROM mylist WHERE username="' + `${req.session.email}` + '" and title="' + `${result[i].title}` + '"');

if (r.length > 0) {
inmylist[i] = { isinlist: 'yes' };
} else
inmylist[i] = { isinlist: 'NO' };
}
res.json({ msg: result , inmylist: inmylist });

}

exports.moviePage=async function(req, res){
    var title = req.query.title
    const qyery1 = `SELECT *FROM mytable WHERE title="${title}" LIMIT 9`;

    const result = await query(qyery1);

    result.forEach(element => {
        element.genre = element.genre.replace(/'/g, '');
        element.genre = element.genre.replace("[", '');
        element.genre = element.genre.replace("]", '');

        element.directors = element.directors.replace(/'/g, '');
        element.directors = element.directors.replace("[", '');
        element.directors = element.directors.replace("]", '');

        element.actors = element.actors.replace(/'/g, '');
        element.actors = element.actors.replace("[", '');
        element.actors = element.actors.replace("]", '');

        element.countries = element.countries.replace("['", '');
        element.countries = element.countries.replace("']", '');

    });
    
    res.render("moviepage", { result });

}

exports.myList=async function(req, res){
    if (req.session.email) {
    //routing for title
    var inmylist = [];
    var i = 0;
    const qyery1 =
    `SELECT * FROM mytable  WHERE title IN (SELECT title FROM mylist WHERE username="${req.session.email}" ) LIMIT 18`;
    const result = await query(qyery1);

    for (var i = 0; i < result.length; i++) {

        result[i].genre = result[i].genre.replace(/'/g, '');
        result[i].genre = result[i].genre.replace("[", '');
        result[i].genre = result[i].genre.replace("]", '');



    }
    res.render("mylist", { result });
}
else{
    res.redirect( "/PopCorn"
       
 );
}

}
exports.loadList=async function(req, res){
       
    var offset=req.query.offset;
    var inmylist = [];
    var i = 0;

    const qyery1 =
    `SELECT * FROM mytable  WHERE title IN (SELECT title FROM mylist WHERE username="${req.session.email}" ) LIMIT 18 OFFSET ${offset}`;

    const result = await query(qyery1);
    for (var i = 0; i < result.length; i++) {

        result[i].genre = result[i].genre.replace(/'/g, '');
        result[i].genre = result[i].genre.replace("[", '');
        result[i].genre = result[i].genre.replace("]", '');


        
    }
    res.json({ msg: result });

 }

 exports.addtoList=async function(req, res){
      
    let sqlQueryString;
    var title =req.query.title;
    var isinmylist =req.query.isinmylist;

    if(isinmylist==='NO'){
      sqlQueryString=  'INSERT INTO `mylist`(`username`, `title`) VALUES ("' +
        `${req.session.email}` +
        '","' +
        `${title}`+'")';
    }
    else
     sqlQueryString=  'DELETE FROM `mylist` WHERE username="' +
        `${req.session.email}` +
        '" and title="' +
        `${title}`+'"';
    const result = await query(sqlQueryString);
    res.json({ msg:'success' });

    }
    exports.charts=async function(req, res){
      
      
        res.render("charts");
        }
        exports.loadchart=async function(req, res){
       var array=[];
            var data=req.query.data;
            var datapoint=[];
            var result2;
            var has=0;
           
                var qyery1 = `SELECT DISTINCT ${data} AS data FROM mytable`;
            const result = await query(qyery1);
           // array= result;
            if(data!='rating' && data!='year'){
               for (var i = 0; i < result.length; i++) {

                    result[i].data = result[i].data.replace(/'/g, '');
                    result[i].data = result[i].data.replace("[", '');
                    result[i].data = result[i].data.replace("]", '');
                    
                    var string =  result[i].data.split(",");
                   // var string =  "UAE,UK,US,UK,SA".split(",");
                    for(var j=0;j<string.length;j++){
                      //  console.log(string[j]);
                      string[j]=string[j].replace(" ", '');
                      for(var z=0;z<array.length;z++){
                        
                        if (Object.values(array[z]).indexOf(string[j]) > -1) {
                           // console.log('has test1');
                             has=1;
                          }
                      }
                        if(!has && string[j]!='')
                        array.push({data:string[j]})
                        has=0;
                    }
            
                    
               }
            }
            else
              array= result;
        
     //console.log( array);
       
            for (var i = 0; i < array.length; i++) {
              //  array[i].data=array[i].data.replace(" ", '');
               if(array[i].data!='')
              qyery1 =
                `SELECT COUNT(*) AS count FROM mytable where ${data} LIKE "%${array[i].data}%"`;
               

               console.log( qyery1);
                result2 = await query(qyery1);
               
                datapoint.push({y:result2[0].count,label:array[i].data});
       
        // console.log(result2[0].count);
        // console.log(array[i].data);
            }
            
            
            
           
//console.log( datapoint);
       
         res.json({ msg: datapoint });
        
         }