//create button that will display "heads" or "tails" on the screen when clicked
//use math.random to account for the 50% 

const button = document.createElement("button");
button.innerText = "Flip Coin";
button.id = "flipButton";
document.body.appendChild(button);

const resetButton = document.createElement("button");
resetButton.innerText = "Reset";
resetButton.id = "resetButton";
document.body.appendChild(resetButton);

//button.addEventListener('click', () => {
  //  alert('test')
//});

/*
function coinflip() {
    const random = Math.random();

    if(random > 0.5) {
        alert('Heads');
    } else {
        alert('Tails');
    }
}

button.addEventListener('click', coinflip);
*/

function multipleCoinFlip() {
    
    //const coinArr = [];
    const userInput = prompt("How many coins would you like to flip?");

    if (isNaN(userInput)) {
        const p = document.getElementById("results");
        p.innerText = ("Please enter a number.");
        p.style = "color: red";
        //return alert('Please enter a number.');
    } else {
        //userInput flip the coin
        let coinArr = [];
        for(let i = 0; i < userInput; i++) {
            const random = Math.random();
            if(random > 0.5) {
                coinArr.push("Heads");
               // alert('Heads');
            } else {
                coinArr.push("Tails");
               // alert('Tails');
            }

    } 
        const results = coinArr.join(", ");
        //alert("You flipped: " + results + ".");
        //alert(`You flipped: ${results}.`);
        //alert(`You flipped ${coinArr.length} times`);
        const p = document.getElementById("results");
        p.innerText = ("You flipped: " + results + ".");
        p.style = "";
    } 

    
}

function resetForm() {
    const p = document.getElementById("results");
    p.innerText = "";
}

button.addEventListener('click', multipleCoinFlip);

resetButton.addEventListener('click', resetForm);