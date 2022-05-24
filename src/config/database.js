const mySql = require('mysql');
const util = require('util');


const pool = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies'
});
const query = util.promisify(pool.query).bind(pool);


module.exports = query;