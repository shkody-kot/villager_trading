var add_customer = document.getElementById('add-customer');
add_customer.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-customer'));
    
    var name = form_data.get('name');		
    
    var query = `INSERT INTO customers (name) VALUES ('${name}');`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});

var update_customer = document.getElementById('update-customer');
update_customer.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('update-customer'));
    
    var name = form_data.get('name');
	var new_name = form_data.get('new-name');
	
	var query = `UPDATE customers SET name = '${new_name}' WHERE customer_id = (SELECT customer_id FROM customers WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});

var delete_customer = document.getElementById('delete-customer');
delete_customer.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-customer'));
    
    var name = form_data.get('name');
	var query = `DELETE FROM customers WHERE customer_id = (SELECT customer_id FROM customers WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});