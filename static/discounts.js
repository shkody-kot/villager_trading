//add a discount
var add_discount = document.getElementById('add-discount');
add_discount.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-discount'));
    
    var name = form_data.get('name');		
    var percent = form_data.get('percent');
    
    var query = `INSERT INTO discounts (name, percent) VALUES ('${name}', ${percent});`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});

var update_discount = document.getElementById('update-discount');
update_discount.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('update-discount'));
	
	var name = form_data.get('name');		
    var percent = form_data.get('percent');
	
	var query = `UPDATE discounts SET percent = '${percent}' WHERE discount_id = (SELECT discount_id FROM discounts WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
	location.reload();
});

var delete_discount = document.getElementById('delete-discount');
delete_discount.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-discount'));
	
	var name = form_data.get('name');
	var query = `DELETE FROM discounts WHERE discount_id = (SELECT discount_id FROM discounts WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
	location.reload();
});