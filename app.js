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

  const qyery1 = "SELECT img_url , rating , genre ,title,year,runtime,countries,description,actors,directors FROM `movie` WHERE title='A Rainy Day in New York' LIMIT 9";

  const result = await query(qyery1);


  console.log(result)
  res.render("index", { result });

})



app.listen(3000, () => {

  console.log('ruunig on 3000');


});










// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var mysql = require('mysql');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
