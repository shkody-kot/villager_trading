/* 
CITATIONS:
Access from data in javascript, from stackoverflow – syntax (it’s one line): https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting 
Feb 27, 2023
Prevent default actions on form submit, from MDN – syntax (it is also one line): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 
Feb 27, 2023
*/


//add a customer and refresh page to update
var add_customer = document.getElementById('add-customer');
add_customer.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-customer'));
    
    var name = form_data.get('name');	
	if (!validate(name)) { return; }	
    
    var query = `INSERT INTO customers (name) VALUES ('${name}');`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});


//update a customer and refresh page to update
var update_customer = document.getElementById('update-customer');
update_customer.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('update-customer'));
    
    var name = form_data.get('name');
	var new_name = form_data.get('new-name');
	if (!validate(new_name) || !validate(name)) { return; }
	
	var query = `UPDATE customers SET name = '${new_name}' WHERE customer_id = (SELECT customer_id FROM customers WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});

//delete a customer and refresh page to update
var delete_customer = document.getElementById('delete-customer');
delete_customer.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-customer'));
    
    var name = form_data.get('name');
	var query = `DELETE FROM customers WHERE customer_id = (SELECT customer_id FROM customers WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});