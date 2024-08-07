//create button that will display "heads" or "tails" on the screen when clicked
//use math.random to account for the 50% 

const button = document.createElement("button");
button.innerText = "Flip Coin";
button.id = "flipButton";
document.body.appendChild(button);

//button.addEventListener('click', () => {
  //  alert('test')
//});

function coinflip() {
    const random = Math.random();

    if(random > 0.5) {
        alert('Heads');
    } else {
        alert('Tails');
    }
}

button.addEventListener('click', coinflip);