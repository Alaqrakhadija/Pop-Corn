const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const query = require('./config/database');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));



app.get('/', async(req, res) => {

    const qyery1 = "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating,Runtime FROM `imdb_top_1000` LIMIT 4";
    const qyery2 = "SELECT Poster_Link,Series_Title,Overview FROM `imdb_top_1000` LIMIT 6";

    // pool.getConnection((err, connection) => {


    //     if (err) return;

    //     connection.query(qyery, (err, result) => {
    //         console.log(result);
    //         result1 = result

    //     })

    // })

    const result = await query(qyery1);
    const result2 = await query(qyery2);

    console.log(result)
    res.render("index", { result, result2 });



})



app.get('/query', (req, res) => {
    const parameters = req.query;

    const keyArray = Object.keys(parameters);
    let sqlQueryString = 'select * from imdb_top_1000 where ';
    console.log(parameters[keyArray[0]]);
    for (i = 0; i < keyArray.length; i++) {

        const name = keyArray[i];
        // if (i === keyArray.length - 1) {
        //     sqlQueryString += `${name}=${parameters[name]}`


        // }
        sqlQueryString += `${name}='${parameters[name]}' `

    }
    console.log(sqlQueryString);
    pool.getConnection((err, connection) => {


        if (err) return;
        connection.query(sqlQueryString, (err, result) => {
            console.log(result);
        })

    })

    console.log(keyArray);






})


app.get('/search', async(req, res) => {

    const search = req.query.q;

    res.json({ msg: "your search is :" + search });

})











app.listen(3000, () => {

    console.log('ruunig on 3000');


});