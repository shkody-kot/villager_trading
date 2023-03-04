//select buttons/forms to show/hide buttons on click
var edit_buttons = document.getElementsByClassName('edit');
var delete_buttons = document.getElementsByClassName('delete');
var submit = document.querySelectorAll('input[type=submit]');
var update = document.getElementsByClassName('update');
var remove = document.getElementsByClassName('remove');

//functions to show add/delete modals on click
function hide() {
	for(var i = 0; i < update.length; i++) {
        update[i].className += "hidden"; 
    }

	for(var i = 0; i < remove.length; i++) {
        remove[i].className += "hidden"; 
    }
}

function unhide_update() {
	for(var i = 0; i < update.length; i++) {
		update[i].classList.toggle("hidden"); 
    }
}

function unhide_delete() {
	for(var i = 0; i < remove.length; i++) {
        remove[i].classList.toggle("hidden"); 
    }
}

for (var i = 0; i < submit.length; i++) {
    submit[i].addEventListener('click', hide);
}

for (var i = 0; i < edit_buttons.length; i++) {
    edit_buttons[i].addEventListener('click', unhide_update);
}

for (var i = 0; i < delete_buttons.length; i++) {
    delete_buttons[i].addEventListener('click', unhide_delete);
}

