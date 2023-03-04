var add_customer = document.getElementById('add-customer');
add_customer.addEventListener('submit', function(event){
    event.preventDefault();
    var form_data = new FormData(document.getElementById('add-customer'));
    
    var name = form_data.get('name');		
    
    var query = `INSERT INTO customers (name) VALUES ('${name}');`;
    fetch_data(url[1], true, query, fill_table);
    console.log(query);
    location.reload();
});