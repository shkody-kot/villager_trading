var add_transaction = document.getElementById('add-transaction');
add_transaction.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-transaction'));
    
    var villager = form_data.get('villager');
    var customer = form_data.get('customer');
    var discount = form_data.get('discount');
    var price = form_data.get('price');

    var item = form_data.get('item');
    var num = form_data.get('num');
    
    var query = `INSERT INTO transactions (customer_id, villager_id, discount_id, total_price) VALUES ((SELECT customer_id FROM customers WHERE name = '${customer}'), (SELECT villager_id FROM villagers WHERE name = '${villager}'), (SELECT discount_id FROM discounts WHERE name = '${discount}'), ${price});`;
    var query2 = `INSERT INTO transaction_has_items (transaction_id, item_id, quantity) VALUES ((SELECT transaction_id FROM transactions WHERE transaction_id = LAST_INSERT_ID()), (SELECT item_id FROM items WHERE name = '${item}'), ${num});`; 
    fetch_data(url[1], true, query, fill_table);
    fetch_data(url[1], true, query2, fill_table);
    location.reload()
});

var delete_transaction = document.getElementById('delete-transaction');
delete_transaction.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-transaction'));
	
	var name = form_data.get('name');
	
	var query = `DELETE FROM transactions WHERE transaction_id = ${name};`;
	fetch_data(url[1], true, query, fill_table);
    location.reload()
});