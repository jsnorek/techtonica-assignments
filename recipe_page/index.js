

const list = document.getElementById('recipeItems');
const listItems = list.getElementsByTagName('li');
let newListItem = document.createElement('li');
list.appendChild(newListItem);
newListItem.innerHTML = 'Bonus: 1 cup chopped raw pecans';
//document.querySelector('ul').appendChild(newListItem);

/*let checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.name = "listItems";
checkbox.value = "value";
checkbox.id = "id";*/

/* To add label to checkbox
var label = document.createElement('label');
label.htmlFor = "id";
label.appendChild (
    document.createTextNode("checkbox labels")
); */

//list.appendChild(checkbox);

//list.prepend
 function checkboxList() {
    for (let i = 0; i <listItems.length; i++) {
        let listItemCheckbox = document.createElement('input');
        listItemCheckbox.type = 'checkbox';
        listItems[i].prepend(listItemCheckbox);
    }
 } 
    checkboxList();

const headerElements = document.getElementsByTagName('h2');
console.log(headerElements);
const recipeHeader = headerElements[0];
const instructionsHeader = headerElements[1];

//to add color change button click to single element
/*
function colorChange() {
    //console.log(recipeHeader);
    if(recipeHeader.style.color === "blue") {
        recipeHeader.style.color = "rgb(101, 2, 60)";
    } else {
        recipeHeader.style.color = "blue";
    }
}       console.log(recipeHeader.style.color);


recipeHeader.addEventListener("click", colorChange);
instructionsHeader.addEventListener("click", colorChange);
*/

function colorChange(element) {
    //console.log(recipeHeader);
    if(element.style.color === "blue") {
        element.style.color = "rgb(101, 2, 60)";
    } else {
        element.style.color = "blue";
    }
}      


recipeHeader.addEventListener("click", () => colorChange(recipeHeader))
instructionsHeader.addEventListener("click", () => colorChange(instructionsHeader))

//long version
/*function eventFunction() {
    colorChange(recipeHeader)
  }
  
  el.addEventListener("click", eventFunction) */
//recipeHeader.addEventListener("click", colorChange(recipeHeader));
//instructionsHeader.addEventListener("click", colorChange);


let magicButton = document.createElement('BUTTON');
magicButton.type = "button";
magicButton.name = "magic";

list.appendChild(magicButton);
magicButton.innerHTML = "Magic Button";
magicButton.style.width = '100px';
magicButton.style.height = '20px';
magicButton.style.background = 'blanchedalmond';

/*function buttonColorMagic() {
    if(document.body.style.background == "rgb(248, 197, 227)") {
        document.body.style.background = "honeydew";
    } else {
        document.body.style.background = "rgb(248, 197, 227)";
    }
}*/

/*
function buttonColorMagic() {
    if(document.body.style.background == "linear-gradient(rgb(248, 197, 227), rgb(206, 200, 242))") {
        document.body.style.background = "linear-gradient(rgb(198, 247, 239), rgb(247, 245, 198))";
    } else {
        document.body.style.background = "linear-gradient(rgb(248, 197, 227), rgb(206, 200, 242))";
    }
}
magicButton.addEventListener("click", buttonColorMagic);

*/

document.body.classList.toggle

colorChangeNotice = alert("click on the recipe and instruction headers for a surprise!");