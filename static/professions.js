/* 
CITATIONS:
Access from data in javascript, from stackoverflow – syntax (it’s one line): https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting 
Feb 27, 2023
Prevent default actions on form submit, from MDN – syntax (it is also one line): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 
Feb 27, 2023
*/

//add a profession and refresh page to update
var add_profession = document.getElementById('add-profession');
add_profession.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-profession'));
    
    var name = form_data.get('name');		
    var description = form_data.get('desc');
	
	if (!validate(name) || !validate(description)) { return; }
    
    var query = `INSERT INTO professions (name, description) VALUES ('${name}', '${description}');`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});

//update a profession and refresh page to update
var update_profession = document.getElementById('update-profession');
update_profession.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('update-profession'));
    
    var name = form_data.get('name');		
    var description = form_data.get('description');
	
	if (!validate(description)) { return; }
	
	var query = `UPDATE professions SET description = '${description}' WHERE name = '${name}';`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});

//delete a profession and refresh page to update
var delete_profession = document.getElementById('delete-profession');
delete_profession.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-profession'));
    
    var name = form_data.get('name');	
	var query = `DELETE FROM professions WHERE name = '${name}';`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});