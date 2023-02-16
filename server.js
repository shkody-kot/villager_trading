//set up dependencies
const express = require("express");
var path = require('path');
var fs = require('fs');
var hbs = require('express-handlebars')
//database
var db = require('./connector');

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

//Server POST requests
app.post('/tables', function(request, response) {
	var page = request.body.url;
	console.log(page);
	var query;
	if (page == 'villagers')
	{
		query = "SELECT villagers.name, villagers.trade_name, villagers.age, villagers.status, items.name \
		AS item FROM villagers \
		INNER JOIN villager_has_items ON villagers.villager_id = villager_has_items.villager_id \
		INNER JOIN items ON villager_has_items.item_id = items.item_id \
		ORDER BY villagers.name DESC;";
	}
	else if (page == 'discounts') { query = "SELECT name, `percent` FROM discounts;"; }
	else if (page == 'customers') { query = "SELECT name FROM customers;"; }
	else if (page == 'professions') { query = "SELECT * FROM professions;"; }
	else if (page == 'transactions')
	{
		query = "SELECT transactions.transaction_id, customers.name AS customer, \
		villagers.name AS villager, discounts.name AS discount, transactions.total_price, \
		items.name AS item, transaction_has_items.quantity \
		FROM transactions \
		LEFT JOIN discounts ON transactions.discount_id = discounts.discount_id \
		LEFT JOIN villagers ON transactions.villager_id = villagers.villager_id \
		LEFT JOIN customers ON transactions.customer_id = customers.customer_id \
		LEFT JOIN transaction_has_items ON transactions.transaction_id = transaction_has_items.transaction_id \
		LEFT JOIN items ON transaction_has_items.item_id = items.item_id \
		ORDER BY transactions.transaction_id ASC;";
	}
	else if (page == 'items')
	{
		query = "SELECT name, cost, amount, trade_name FROM items \
		GROUP BY trade_name \
		ORDER BY trade_name ASC;";
	}
	else if (page == 'home')
	{
		data = [];
		db.pool.query("SELECT name AS villager FROM villagers;", function(error, results, fields) {
			data.push(JSON.stringify(results));
			db.pool.query("SELECT name AS customer FROM customers;", function(error, results, fields) {
				data.push(JSON.stringify(results));
				db.pool.query("SELECT name AS discount FROM discounts;", function(error, results, fields) {
					data.push(JSON.stringify(results));
					db.pool.query("SELECT name AS trade FROM professions;", function(error, results, fields) {
						data.push(JSON.stringify(results));
						db.pool.query("SELECT name AS item FROM items;", function(error, results, fields) {
							data.push(JSON.stringify(results));
							console.log(data);
							response.status(200).send(data);
						});
					});
				});
			});
		});
	}
	
	if (request.body.update == true)
	{
		db.pool.query(request.body.query, function(error, results, fields) {
			db.pool.query(query, function(error, results, fields) {
				response.status(200).send(JSON.stringify(results));
			});
		});
	}
	else if (page != 'home') {
		db.pool.query(query, function(error, results, fields) {
			response.status(200).send(JSON.stringify(results));
		});
	}
});


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