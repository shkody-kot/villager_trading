//add new item
var add_item = document.getElementById('add-new-item');
add_item.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-new-item'));
    
    var name = form_data.get('name');		
    var cost = form_data.get('cost');
    var amount = form_data.get('amount');		
    var profession = form_data.get('profession');
	
	if (!validate(name)) { return; }
    
    var query = `INSERT INTO items (name, cost, amount, trade_name) VALUES ('${name}', ${cost}, ${amount}, (SELECT name FROM professions WHERE name = '${profession}'));`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});

//update item
var update_item = document.getElementById('update-item');
update_item.addEventListener('submit', function(event){
	event.preventDefault();
	var form_data = new FormData(document.getElementById('update-item'));
	
	var name = form_data.get('name');		
    var cost = form_data.get('cost');
    var amount = form_data.get('amount');		
    var profession = form_data.get('profession');
	
	if (!validate(name)) { return; }
	
	var query = `UPDATE items SET cost = '${cost}', amount = '${amount}', trade_name = (SELECT name FROM professions WHERE name = '${profession}') WHERE item_id = (SELECT item_id FROM items WHERE name = '${name}')`;
	fetch_data(url[1], true, query, fill_table);
	location.reload();
});

//delete item
var remove_item = document.getElementById('delete-item');
remove_item.addEventListener('submit', function(event){
	event.preventDefault();
	var form_data = new FormData(document.getElementById('delete-item'));
	
	var name = form_data.get('name');
	var query = `DELETE FROM items WHERE name = '${name}';`;
	fetch_data(url[1], true, query, fill_table);
	location.reload();
});