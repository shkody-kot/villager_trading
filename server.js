//set up dependencies
const express = require("express");
var path = require('path');
var fs = require('fs');
var hbs = require('express-handlebars')
//database
//var db = require('./connector');

//create application
var app = express();

//includes all the funky little css and js files
app.use(express.static(__dirname + '/static'));
app.use(express.json());

var port = process.env.PORT || 3000;


//set server to use handlebars templates
app.set('view engine', 'handlebars');

app.engine('handlebars', hbs.engine({
	layoutsDir: path.join(__dirname, '/views/layouts'),
	extname: 'handlebars',
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, '/views/partials')
}));

//Server's GET requests for pages
app.get('/', function (request, response) {
	response.status(200).render('intro', { layout: 'main', active: {Home: true } });
});

app.get('/villagers', function (request, response) {
	response.status(200).render('villagers', { layout: 'main', active: {Villagers: true }});
});

app.get('/discounts', function (request, response) {
	response.status(200).render('discounts', { layout: 'main', active: {Discounts: true } });
});

app.get('/customers', function (request, response) {
	response.status(200).render('customers', { layout: 'main', active: {Customers: true } });
});

app.get('/professions', function (request, response) {
	response.status(200).render('professions', { layout: 'main', active: {Professions: true } });
});

app.get('/transactions', function (request, response) {
	response.status(200).render('transactions', { layout: 'main', active: {Transactions: true } });
});

app.get('/items', function (request, response) {
	response.status(200).render('items', { layout: 'main', active: {Items: true } });
});

app.get('*', function (request, response) {
	response.status(404).render('404', { layout: 'main' });
})

app.listen(port, function () {
	console.log("Server is listening on port", port);
});