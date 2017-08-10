var express = require('express');
var morgan = require('morgan');
var path = require('path');
var os = require('os');
var pg = require('pg');

const pool = new pg.Pool({
  user: 'pantharshit00',
  host: 'db.imad.hasura-app.io',
  database: 'pantharshit00',
  password: process.env.DB_PASSWORD,
});

function db_generate_query(table, where, value){
    return `SELECT * FROM "${table}" WHERE "${where}" = "${value}"`;
}

pool.query(db_generate_query("user","id",1),function(err,res){
    if(err) throw err;
    console.log(res.rows[0]);
})

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.use('/ui',express.static(path.join(__dirname,'ui')));

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
