//Get an instance of mysql to be used in the application
var mysql = require("mysql");

//create a connection pool using provided credentials

var pool = mysql.createPool({
	connectionLimit:	10,
	host:				'classmysql.engr.oregonstate.edu',
	user:				'cs340_belyaevi',
	password:			'0195',
	database:			'cs340_belyaevi'
});

//export the module
module.exports.pool = pool;