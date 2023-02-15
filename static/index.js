var url = window.location.pathname.split('/');
var loaded = false;
document.addEventListener( "DOMContentLoaded", fetch_data(url[1]), false);

function fetch_data(url)
{
	var object = {
		url: url
	};
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
		{ //when response successful
			var data = JSON.parse(this.responseText);
			fill_table(data);
		}
	}
	xmlhttp.open("POST", '/tables', false);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(object));
}

function fill_table(data)
{
	var table = document.getElementById("table");
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
		table_data = document.createElement("tr");
		
		//add buttons
		table_data.innerHTML = "<td><a href=\"#\" >Edit</a></td>"; 
		table_data.innerHTML += "<td><a href=\"#\" >Delete</a></td>";
		
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
	console.log(table);
	loaded = true;
}

function fill_dropdown(id, column_name)
{
	var dropdown = document.getElementById(id);
	var table = document.getElementById("table");
	var position = null;
	
	//find the column
	for (var pos = 0; pos < table.rows[0].cells.length; pos++)
	{
		if (table.rows[0].cells[pos].innerText == column_name) { position = pos; }
	}
	console.log(column_name + ' ' + position);
	if (position == null) { return; }
	var data = [];
	//populate dropdown
	for (var i = 1; i < table.rows.length; i++)
	{
		var option = document.createElement("option");
		var entry = table.rows[i].cells[position].innerHTML;
		if (!data.includes(entry))
		{
			data.push(entry);
			console.log(data);
			option.value = entry;
			option.text = entry;
			dropdown.appendChild(option);
		}
	}
	console.log(dropdown);
	return;
}	

if (url[1] != '/')
{
	var villager = document.getElementById("villager-new");
	var item = document.getElementById("item");
	var customer = document.getElementById("customer");
	var discount = document.getElementById("discount");
	var profession = document.getElementById("profession-update");
	
	if (villager)
	{
		if (url[1] == 'villagers') { fill_dropdown("villager-new", "name"); fill_dropdown("villager-update", "name"); }
		else { fill_dropdown("villager-new", "villager"); fill_dropdown("villager-update", "villager"); }
	}
	if (item) 
	{ 
		if (url[1] == 'items') { fill_dropdown("item", "name"); fill_dropdown("item-remove", "name"); }
		else { fill_dropdown("item", "item"); }
	}
	if (customer) { fill_dropdown("customer", "customer"); }
	if (discount) { fill_dropdown("discount", "discount"); }
	if (profession) { fill_dropdown("profession-update", "trade_name"); }
}

