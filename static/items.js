var add_item = document.getElementById('add-new-item');
add_item.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-new-item'));
    
    var name = form_data.get('name');		
    var cost = form_data.get('cost');
    var amount = form_data.get('amount');		
    var profession = form_data.get('profession');
    
    var query = `INSERT INTO items (name, cost, amount, trade_name) VALUES ('${name}', ${cost}, ${amount}, (SELECT name FROM professions WHERE name = '${profession}'));`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});