var add_profession = document.getElementById('add-profession');
add_profession.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-profession'));
    
    var name = form_data.get('name');		
    var description = form_data.get('desc');
    
    var query = `INSERT INTO professions (name, description) VALUES ('${name}', '${description}');`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});

var update_profession = document.getElementById('update-profession');
update_profession.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('update-profession'));
    
    var name = form_data.get('name');		
    var description = form_data.get('description');
	
	var query = `UPDATE professions SET description = '${description}' WHERE name = '${name}';`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});

var delete_profession = document.getElementById('delete-profession');
delete_profession.addEventListener('submit', function(event){
	event.preventDefault();
    var form_data = new FormData(document.getElementById('delete-profession'));
    
    var name = form_data.get('name');	
	var query = `DELETE FROM professions WHERE name = '${name}';`;
	fetch_data(url[1], true, query, fill_table);
    location.reload();
});