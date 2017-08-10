var express = require('express');
var morgan = require('morgan');
var path = require('path');
var os = require('os');
var {Pool} = require('pg');

const pool = new Pool({
  user: 'pantharshit00',
  host: 'db.imad.hasura-app.io',
  database: 'pantharshit00',
  password: process.env.DB_PASSWORD,
});

const test = async function(){
    await console.log('test');
}


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
