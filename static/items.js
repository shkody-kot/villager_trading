/* 
Access from data in javascript, from stackoverflow – syntax (it’s one line): https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting 
Feb 27, 2023
Prevent default actions on form submit, from MDN – syntax (it is also one line): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 
Feb 27, 2023
*/

//add new item and refresh page to update
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

//update item and refresh page to update
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

//delete item and refresh page to update
var remove_item = document.getElementById('delete-item');
remove_item.addEventListener('submit', function(event){
	event.preventDefault();
	var form_data = new FormData(document.getElementById('delete-item'));
	
	var name = form_data.get('name');
	var query = `DELETE FROM items WHERE name = '${name}';`;
	fetch_data(url[1], true, query, fill_table);
	location.reload();
});