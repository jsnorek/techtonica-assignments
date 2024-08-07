//create button that will display "heads" or "tails" on the screen when clicked
//use math.random to account for the 50% 

const button = document.createElement("button");
button.innerText = "Flip Coin";
button.id = "flipButton";
document.body.appendChild(button);

button.addEventListener('click', () => {
    alert('test')
});

//document.body.appendChild(button);