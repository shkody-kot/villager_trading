/*
Code for dynamic search adapted from CS340 starter app: https://github.com/osu-cs340-ecampus/nodejs-starter-app
3/15/2023
*/

//set up dependencies
const express = require("express");
var path = require('path');
var fs = require('fs');
var hbs = require('express-handlebars')
//database
var db = require('./connector');

//create application
var app = express();
var query_cust; //used to track query for dynamic search

//includes all the funky little css and js files
app.use(express.static(__dirname + '/static'));
app.use(express.json());

var port = process.env.PORT || 30000;


//set server to use handlebars templates
app.set('view engine', 'handlebars');

app.engine('handlebars', hbs.engine({
	layoutsDir: path.join(__dirname, '/views/layouts'),
	extname: 'handlebars',
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, '/views/partials')
}));

//Server POST requests for displaying tables on each page
app.post('/tables', function(request, response) {
	var page = request.body.url;
	console.log(page);
	var query;
	if (page == 'villagers')
	{
		
		query = "SELECT villagers.name AS Name, villagers.trade_name AS Profession, \
		villagers.age AS Age, villagers.status AS Status, items.name AS Item \
		FROM villagers \
		LEFT JOIN villager_has_items ON villagers.villager_id = villager_has_items.villager_id \
		INNER JOIN items ON villager_has_items.item_id = items.item_id \
		ORDER BY villagers.name DESC;";
	}
	else if (page == 'discounts') { query = "SELECT name AS Name, `percent` AS `Percent` FROM discounts;"; }
	else if (page == 'customers') { query = "SELECT name AS Name FROM customers;"; }
	else if (page == 'professions') { query = "SELECT name AS 'Name', description AS 'Description' FROM professions;"; }
	else if (page == 'transactions')
	{
		
		if (query_cust === undefined) {
			//query to display table if search table is blank
			query = "SELECT transactions.transaction_id AS Transaction, customers.name AS Customer, \
			villagers.name AS Villager, discounts.name AS Discount, transactions.total_price AS `Total Price`, \
			items.name AS Item, transaction_has_items.quantity AS Quantity\
			FROM transactions \
			LEFT JOIN discounts ON transactions.discount_id = discounts.discount_id \
			LEFT JOIN villagers ON transactions.villager_id = villagers.villager_id \
			LEFT JOIN customers ON transactions.customer_id = customers.customer_id \
			LEFT JOIN transaction_has_items ON transactions.transaction_id = transaction_has_items.transaction_id \
			LEFT JOIN items ON transaction_has_items.item_id = items.item_id \
			ORDER BY transactions.transaction_id ASC;";
		}
		else {
			//query to display table based on customer search entered
			query = `SELECT transactions.transaction_id AS Transaction, customers.name AS Customer, \
			villagers.name AS Villager, discounts.name AS Discount, transactions.total_price AS 'Total Price', \
			items.name AS Item, transaction_has_items.quantity AS Quantity\
			FROM transactions \
			LEFT JOIN discounts ON transactions.discount_id = discounts.discount_id \
			LEFT JOIN villagers ON transactions.villager_id = villagers.villager_id \
			LEFT JOIN customers ON transactions.customer_id = customers.customer_id \
			LEFT JOIN transaction_has_items ON transactions.transaction_id = transaction_has_items.transaction_id \
			LEFT JOIN items ON transaction_has_items.item_id = items.item_id \
			WHERE customers.name LIKE "${query_cust}%"\
			ORDER BY transactions.transaction_id ASC;`;
			console.log(query);
		}
		
	}
	else if (page == 'items')
	{
		query = "SELECT name AS Name, cost AS Price, amount AS Amount, trade_name AS Profession FROM items \
		ORDER BY trade_name ASC;";
	}
	// if page is home, load all queries
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
							db.pool.query("SELECT transaction_id AS transaction FROM transactions;", function(error, results, fields) {
								data.push(JSON.stringify(results));
								console.log(data);
								response.status(200).send(data);
							});
						});
					});
				});
			});
		});
	}

	// update if there is new information
	if (request.body.update == true)
	{
		console.log(request.body.query);
		db.pool.query(request.body.query, function(error, results, fields) {
			console.log(results);
			db.pool.query(query, function(error, results, fields) {
				console.log(results);
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
	query_cust = request.query.customersearch;
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