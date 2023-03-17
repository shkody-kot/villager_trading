/* 
CITATIONS:
Access from data in javascript, from stackoverflow – syntax (it’s one line): https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting 
Feb 27, 2023
Prevent default actions on form submit, from MDN – syntax (it is also one line): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 
Feb 27, 2023
*/

//add a discount and refresh page to update
var add_discount = document.getElementById('add-discount');
add_discount.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-discount'));
    
    var name = form_data.get('name');		
    var percent = form_data.get('percent');
	
	if (!validate(name)) { return; }
    
    var query = `INSERT INTO discounts (name, percent) VALUES ('${name}', ${percent});`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});

//update a discount and refresh page to update
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


//delete a discount and refresh page to update
var delete_discount = document.getElementById('delete-discount');
delete_discount.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-discount'));
	
	var name = form_data.get('name');
	var query = `DELETE FROM discounts WHERE discount_id = (SELECT discount_id FROM discounts WHERE name = '${name}');`;
	fetch_data(url[1], true, query, fill_table);
	location.reload();
});