'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let jade = require('jade');
let config = require('./config.json');
let app = express();

app.set('view engine', 'jade');
app.set('view', path.resolve(`./${config.http.publicRoot}/markups/_pages`));

app.use(express.static(path.resolve(config.http.publicRoot)));

/*маршруты*/

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html;charset=utf8');
    res.end('работает!');
});

app.use((req, res, next)=> res.status(404).send('Not found'));

app.use((err, req, res, next) =>{
    res.status(500);
    res.render('error', {error: err.message});
    console.error(err.message, err.stack);
});

app.listen(config.http.port, config.http.host, () =>{
    let uploadDir = path.resolve(config.http.publicRoot, 'upload');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
});


var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
