# Database-driven website for Minecraft villager trading options
Contains information about villagers present in a villager, as well as their statuses, the items they have, transactions that happened in the village, any customers, discounts, and the professions of villagers currently employed. [Current live site available here](http://flip1.engr.oregonstate.edu:30000/)

## Code source citations 

We looked up a lot of specific syntax questions, where the code provided by those sources wasn’t a fully-fledged code solution, but rather an explanation of how to use a specific built-in function, or object, to achieve its intended purpose (e.g. LocalStorage). 

### cache.js
- Table html code,from ED discussions user Iain Moncrief, modified for templating: https://edstem.org/us/courses/32532/discussion/2559944  
    - 2/12/2023
- Dynamically populated dropdowns, from stackoverflow – modified code to fit our particular needs to depend off of an array of data not a previous dropdown: https://stackoverflow.com/questions/30232146/dynamically-populating-drop-down-list-from-selection-of-another-drop-down-value
    - 2/14/2023
- Local storage, from MDN – syntax (this was a new concept to us): https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage 
    - 2/14/2023
- Fill table from array, from stackoverflow – based on various code examples presented, not copied verbatim from any one example: https://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table 
    - 2/12/2023

### index.js 
- hide() and unhide() modal functions adapted from: https://www.w3schools.com/howto/howto_css_modals.asp
    - 3/15/2023


### connector.js 
- Code from Activity 2: Connect Database to Webapp. Unmodified
    - 2/13/2023

### style.css 
- Style code for card and card-container code, modified: https://www.w3schools.com/howto/howto_css_cards.asp
    - 3/16/2023
- Style code for navitem and animated switch taken from: https://www.30secondsofcode.org/css/s/hover-underline-animation#:~:text=Creates%20an%20animated%20underline%20effect,place%20it%20below%20the%20content.
    - 1/22/2023
- Code for modal style adapted from: https://www.w3schools.com/howto/howto_css_modals.asp
    - 3/15/2023

### villagers.js, transactions.js, discounts.js, professions.js, items.js, customers.js
- Access from data in javascript, from stackoverflow – syntax (it’s one line): https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting 
    - Feb 27, 2023
- Prevent default actions on form submit, from MDN – syntax (it is also one line): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 
    - Feb 27, 2023

### villagers.handlebars, transactions.handlebars, discounts.handlebars, professions.handlebars, items.handlebars, customers.handlebars
- Code for modal divs and class formatting adapted from: https://www.w3schools.com/howto/howto_css_modals.asp
    - 3/15/2023
- Transactions.handlebars: code for dynamic search adapted from CS340 starter app: https://github.com/osu-cs340-ecampus/nodejs-starter-app
    - 3/15/2023

