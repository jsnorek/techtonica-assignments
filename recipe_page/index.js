

const list = document.getElementById('recipeItems');
const listItems = list.getElementsByTagName('li');
let newListItem = document.createElement('li');
list.appendChild(newListItem);
newListItem.innerHTML = 'Bonus: 1 cup chopped raw pecans';
//document.querySelector('ul').appendChild(newListItem);

let checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.name = "listItems";
checkbox.value = "value";
checkbox.id = "id";

/* To add label to checkbox
var label = document.createElement('label');
label.htmlFor = "id";
label.appendChild (
    document.createTextNode("checkbox labels")
); */

//list.appendChild(checkbox);

/*
 function checkboxList() {
    for (let i = 0; i <listItems.length; i++) {
        let listItemCheckbox = document.createElement('input');
        listItemCheckbox.type = 'checkbox';
        listItemCheckbox.appendChild(listItemCheckbox);
    }
 }
*/

//to add label to checkbox
//list.appendChild(label);