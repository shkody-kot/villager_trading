var add_profession = document.getElementById('add-profession');
add_profession.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-profession'));
    
    var name = form_data.get('name');		
    var description = form_data.get('description');
    
    var query = `INSERT INTO professions (name, description) VALUES ('${name}', '${description}');`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});