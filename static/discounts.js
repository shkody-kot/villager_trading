
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