/*
CITATIONS:
Access from data in javascript, from stackoverflow – syntax (it’s one line): https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting 
Feb 27, 2023
Prevent default actions on form submit, from MDN – syntax (it is also one line): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 
Feb 27, 2023
*/

//add a transaction and refresh page to update
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

//delete a transaction and refresh page to update
var delete_transaction = document.getElementById('delete-transaction');
delete_transaction.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-transaction'));
	
	var name = form_data.get('name');
	
	var query = `DELETE FROM transactions WHERE transaction_id = ${name};`;
	fetch_data(url[1], true, query, fill_table);
    location.reload()
});

//update a transaction and refresh page to update
var update_transaction = document.getElementById('update-transaction');
update_transaction.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('update-transaction'));
    
	var name = form_data.get('name');
    var villager = form_data.get('villager');
    var price = form_data.get('price');

    var item = form_data.get('item');
    var num = form_data.get('num');
	
	var query = `UPDATE transactions SET villager_id = (SELECT villager_id FROM villagers WHERE name = '${villager}'), total_price = ${price} WHERE transaction_id = ${name};`;
    fetch_data(url[1], true, query, fill_table);
    if (item != "null") {
        var query2 = `INSERT INTO transaction_has_items (transaction_id, item_id, quantity) VALUES ((SELECT transaction_id FROM transactions WHERE transaction_id = ${name}), (SELECT item_id FROM items WHERE name = '${item}'), ${num});`;
        fetch_data(url[1], true, query2, fill_table);
    }
    location.reload()
});