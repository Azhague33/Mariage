const axios = require('axios').defaul;
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const fs = require('fs');
const helmet = require('helmet');
const showdown  = require('showdown');
const markdownHtmlConverter = new showdown.Converter()
const sslRedirect = require('heroku-ssl-redirect').default;
const modules = require('./modules');
const querystring = require('querystring');
const {createGzip} = require('zlib');
const url = require('url');
const { get, request } = require('http');

const app = express();

const PORT = process.env.PORT;
const isProduction = (process.env.IS_PROD == 'TRUE' || process.env.IS_PROD == true);
const dataJson = JSON.parse(fs.readFileSync('dataJson.json'));
if(!isProduction) {dataJson.websiteUrl = 'http://localhost:' + process.env.PORT;};

app
.use(sslRedirect())
.use(helmet())
.use(compression())
.use(express.static(__dirname + '/public'))
.use(favicon(__dirname + '/public/images/favicon.png'))
.use(bodyParser.urlencoded({extended: false}))

app.locals = {
	"isProduction": isProduction,
	"websiteUrl": dataJson.websiteUrl,
	"isProduction": isProduction
};


/********** INDEX **********/
app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200);
    res.render('index.ejs', {pageKey: 'index'});
})


/******************** ERRORs & LISTEN ********************/

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.status(404);
	console.log("Contenu non chargé : " + url.parse(req.url).href);
    res.redirect('/');
});

app.listen(PORT);