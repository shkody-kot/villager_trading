/*
CITATIONS:
hide() and unhide() modal functions adapted from: https://www.w3schools.com/howto/howto_css_modals.asp
3/15/2023
*/

//select buttons/forms to show/hide buttons on click
var edit_buttons = document.getElementsByClassName('edit');
var delete_buttons = document.getElementsByClassName('delete');
var submit = document.querySelectorAll('input[type=submit]');
var update = document.getElementsByClassName('update');
var remove = document.getElementsByClassName('remove');
var close = document.getElementsByClassName("close");

var url = window.location.pathname.split('/');

//functions to show add/delete modals on click
function hide() {
	for(var i = 0; i < update.length; i++) {
        update[i].style.display = "none";
    }

	for(var i = 0; i < remove.length; i++) {
       remove[i].style.display = "none"; 
    }
}

for (var i = 0; i < close.length; i++) {
    close[i].addEventListener('click', hide, false);
}

//functions to show modals on click
function unhide_update() {
	for(var i = 0; i < update.length; i++) {
		update[i].style.display = "block";
    }
}

function unhide_delete() {
	for(var i = 0; i < remove.length; i++) {
        remove[i].style.display = "block";
    }
}

//functions to hide info on click
for (var i = 0; i < submit.length; i++) {
    submit[i].addEventListener('click', hide);
}

for (var i = 0; i < edit_buttons.length; i++) {
    edit_buttons[i].addEventListener('click', unhide_update);
}

for (var i = 0; i < delete_buttons.length; i++) {
    delete_buttons[i].addEventListener('click', unhide_delete);
	
}

//basic validation for data
function validate(datafield)
{
	if (!datafield) { alert("fields cannot be empty"); return false; }
	if (datafield.includes("'")) { alert("fields cannot contain single quotes"); return false; }
	return true;
}