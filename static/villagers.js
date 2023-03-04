//add a new villager
var add_villager = document.getElementById('add-villager');
add_villager.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.querySelector('form'));
    
    var name = form_data.get('name');
    var profession = form_data.get('profession');
    var age = form_data.get('age');
    var status = form_data.get('status');
    var item = form_data.get('item');
    
    console.log("name: " + name);
    var query = "INSERT INTO villagers (name, trade_name, age, status) VALUES ( '" + name + "', (SELECT name FROM professions WHERE name = '" + profession + "'), '" + age + "', '" + status + "');";
    var query2 = "INSERT INTO villager_has_items (villager_id, item_id) VALUES ((SELECT villager_id FROM villagers WHERE name = '" + name + "'), (SELECT item_id FROM items WHERE name = '" + item + "'));"; 
    
    fetch_data(url[1], true, query, fill_table);
    fetch_data(url[1], true, query2, fill_table);
    location.reload()
});

//update an existing villager
var update_villager = document.getElementById('update-villager');
update_villager.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('update-villager'));
    
    var name = form_data.get('name');		
    var profession = form_data.get('profession');
    var age = form_data.get('age');
    var status = form_data.get('status');
    
    var query = "UPDATE villagers SET name = '" + name + "', trade_name = (SELECT name FROM professions WHERE name = '" + profession + "'), age = '" + age + "', status = '" + status + "' WHERE villager_id = (SELECT villager_id FROM villagers WHERE name = '" + name + "');";
    fetch_data(url[1], true, query, fill_table);
    location.reload()
});

//add item to a villager
var add_item = document.getElementById('add-item');
add_item.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-item'));
    
    var name = form_data.get('name');		
    var item = form_data.get('item');
    
    var query = "INSERT INTO villager_has_items (villager_id, item_id) VALUES ((SELECT villager_id FROM villagers WHERE name = '" + name + "'), (SELECT item_id FROM items WHERE name = '" + item + "'));";
    fetch_data(url[1], true, query, fill_table);
    location.reload()
});

//delete villager
var delete_item = document.getElementById('remove-villager');
delete_item.addEventListener('submit', function(event) {
    var form_data = new FormData(document.getElementById('remove-villager'));		
    var name = form_data.get('name');	
    var query = "DELETE FROM villagers WHERE villager_id = (SELECT villager_id FROM villagers WHERE name = '" + name + "');";
    fetch_data(url[1], true, query, fill_table);
    location.reload()
});