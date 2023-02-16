var url = window.location.pathname.split('/');
//store some data (item names, villager names, trade names, customer names) for dropdown purposes
var items = [];
var villagers = [];
var trades = [];
var customers = [];
var discounts = [];

if (url[1] == "") { document.addEventListener( "DOMContentLoaded", fetch_data('home', false, null, fill_cache), false); }
else { document.addEventListener( "DOMContentLoaded", fetch_data(url[1], false, null, fill_table), false); }


function fetch_data(url, update, query, next)
{
	//for page
	var object = {
		url: url,
		update: update,
		query: query
	};
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
		{ //when response successful
			var data = JSON.parse(this.responseText);
			next(data);
		}
	}
	xmlhttp.open("POST", '/tables', false);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(object));
}

function fill_table(data)
{
	var table = document.getElementById("table");
	//delete children if exist
	var child = table.lastElementChild;
	while(child)
	{
		table.removeChild(child);
		child = table.lastElementChild;
	}
	
	var table_data = document.createElement("tr");
	
	//add headers to table
	table_data.innerHTML += "<th></th> <th></th>";
	for (var headers in data[0]) 
	{
		var header = document.createElement("th");
		header.innerHTML = headers;
		table_data.appendChild(header);
	}
	table.appendChild(table_data);
	console.log(table_data);
	
	//add rows
	for (var each_item in data)
	{
		var name = data[each_item].name;
		//push the first value (the name) to an array if items/profs/villagers/customers
		if (url[1] == 'items' && !items.includes(name)) { items.push(name); localStorage.setItem("items", JSON.stringify(items));}
		else if (url[1] == 'villagers' && !villagers.includes(name)) { villagers.push(name); localStorage.setItem("villagers", JSON.stringify(villagers));}
		else if (url[1] == 'customers' && !customers.includes(name)) { customers.push(name); localStorage.setItem("customers", JSON.stringify(customers));}
		else if (url[1] == 'professions' && !trades.includes(name)) { trades.push(name); localStorage.setItem("trades", JSON.stringify(trades));}
		else if (url[1] == 'discounts' && !discounts.includes(name)) { discounts.push(name); localStorage.setItem("discounts", JSON.stringify(discounts));}
		
		table_data = document.createElement("tr");
		
		//add buttons
		table_data.innerHTML = "<td><a href=\"#\" class=\"edit button\">Edit</a></td>"; 
		table_data.innerHTML += "<td><a href=\"#\" class=\"delete button\">Delete</a></td>";
		
		//add columns
		var object = data[each_item];
		for (var value in object) 
		{
			var cell = document.createElement("td");
			cell.innerHTML += object[value];
			table_data.appendChild(cell);
		}
		table.appendChild(table_data);
	}
}

function fill_dropdown(id, category)
{
	var dropdown = document.getElementById(id);
	var array = JSON.parse(localStorage.getItem(category));
	console.log(array);
	console.log(category);
	for (var item in array)
	{
		var option = document.createElement("option");
		option.value = array[item];
		option.text = array[item];
		dropdown.appendChild(option);
	}
	
	console.log(dropdown);
	return;
}

function fill_cache(data)
{
	array0 = JSON.parse(data[0]);
	array1 = JSON.parse(data[1]);
	array2 = JSON.parse(data[2]);
	array3 = JSON.parse(data[3]);
	array4 = JSON.parse(data[4]);
	for (var i in array0)
	{
		console.log(array0[i].villager);
		if (!villagers.includes(array0[i].villager)) { villagers.push(array0[i].villager); }
	}
	for (var i in array1)
	{
		if (!customers.includes(array1[i].customer)) { customers.push(array1[i].customer); }
	}
	for (var i in array2)
	{
		if (!discounts.includes(array2[i].discount)) { discounts.push(array2[i].discount); }
	}
	for (var i in array3)
	{
		if (!trades.includes(array3[i].trade)) { trades.push(array3[i].trade); }
	}
	for (var i in array4)
	{
		if (!items.includes(array4[i].item)) { items.push(array4[i].item); }
	}
	
	//cache them!
		localStorage.setItem("items", JSON.stringify(items));
		localStorage.setItem("villagers", JSON.stringify(villagers));
		localStorage.setItem("customers", JSON.stringify(customers));
		localStorage.setItem("trades", JSON.stringify(trades));
		localStorage.setItem("discounts", JSON.stringify(discounts));
	
	return;
}

//main operations
var villager = document.getElementById("villager-new");
var item = document.getElementById("item");
var customer = document.getElementById("customer");
var discount = document.getElementById("discount");
var profession = document.getElementById("profession-update");

if (villager)
{
	fill_dropdown("villager-new", 'villagers'); 
	fill_dropdown("villager-update", 'villagers');
	//if (url[1] == 'villagers') { fill_dropdown("villager-new", "name"); fill_dropdown("villager-update", "name"); }
	//else { fill_dropdown("villager-new", "villager"); fill_dropdown("villager-update", "villager"); }
}
if (item) 
{ 
	fill_dropdown("item", 'items'); 
	if (url[1] == 'items') { fill_dropdown("item-remove", 'items'); }
	//if (url[1] == 'items') { fill_dropdown("item", "name"); fill_dropdown("item-remove", "name"); }
	//else { fill_dropdown("item", "item"); }
}
if (customer) { fill_dropdown("customer", 'customers'); }
if (discount) { fill_dropdown("discount", 'discounts'); }
if (profession) { fill_dropdown("profession-update", 'trades'); }

var edit_buttons = document.getElementsByClassName('edit');
var delete_buttons = document.getElementsByClassName('delete');
	


