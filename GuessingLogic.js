var randomNumber = Math.floor(Math.random() * 99) + 1;
var guessCount = 5;
var hintCount = 1;
var NumGuesses = document.querySelector("#num-Guesses");
var inputNum = document.querySelector("#guess-Field");
var btnSubmit = document.querySelector("#submit-Number");
var outputres = document.querySelector("#Result");
var resetGame = document.querySelector("#reset-game");
var hintButton = document.querySelector("#hint");
var inputpoint;
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
function displayNumOfAttepmts(){
	NumGuesses.innerText=  "You've "+guessCount+" Guesses Left.";
	resetGame.style.display = "none";
	hintButton.style.display = "none";
	console.log(randomNumber);
	console.log("After sleep");
}

async function checkGuess(){	
		console.log(inputNum.value<100);
		console.log(inputNum.value>0);
		inputpoint = Number(inputNum.value);
	if(inputNum.value<100 && inputNum.value>0){
	if(guessCount != 0){
		console.log(inputNum.value>0);
		if (inputNum.value == randomNumber) {
			var attempt = (5-guessCount)+1;
			outputres.innerText = "Congratulations You have correctly Gussesed the number in "+attempt+ " Attempts " +String.fromCodePoint(0x1F604);
			guessCount = 0;
		}else if (inputNum.value > randomNumber) {
			guessCount = guessCount-1;
			if(guessCount == 0){
				outputres.innerText = "Oopss You've exhausted yours Attempts, the Number was "+randomNumber+ " " +String.fromCodePoint(0x1F610);
			}else{
				outputres.innerText = ".......";
				await sleep(100);
				outputres.innerText = "Your Guess was too High!!!";
			}
		}else if(inputNum.value < randomNumber){
			guessCount = guessCount-1;
			if(guessCount == 0){
				outputres.innerText = "Oopss You've exhausted yours Attempts, the Number was "+randomNumber+ " " +String.fromCodePoint(0x1F610);
			}else{
				outputres.innerText = ".......";
				await sleep(100);
				outputres.innerText = "Your Guess was too Low!!!";
			}
		}
	}
		}else{
			if(inputNum.value>=100){
				outputres.innerText = ".......";
				await sleep(50);
			outputres.innerText = "Enter numbers smaller than 100!!";
			}else if(inputNum.value<0){
				outputres.innerText = ".......";
				await sleep(50);
				outputres.innerText = "Enter numbers bigger than 0!!";
			}
		else{
			outputres.innerText = ".......";
				await sleep(50);
			outputres.innerText = "Please Enter a number!!!";
		}
		}

	NumGuesses.innerText= "You've "+guessCount+" Guesses Left.";
	if(guessCount <= 0){
		btnSubmit.style.display = "none";
		hintButton.style.display = "none";
		NumGuesses.style.display = "none";
		resetGame.style.display = "block";
	}
	if (guessCount == 2 && hintCount ==1) {
		NumGuesses.style.backgroundColor="#f9e8ce";
		hintButton.style.display = "block";
	}		
inputNum.value=" ";
	inputNum.focus();
}

inputNum.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnSubmit.click();
    }
});

function hintShow() {
	console.log(inputNum.value)

	var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Simple Line Chart"
	},
	scales: {
      y: {
        ticks: {
          // forces step size to be 10 units
          stepSize: 10
        }
      }
    },

	data: [{        
		type: "line",
      	indexLabelFontSize: 16,
		dataPoints: [
			{ label: "Start", y: 1 },
			{ label: " ", y: inputpoint, indexLabel: "\u2193 Your Guess",markerColor: "red", markerType: "circle" },
			{ label: " ", y: randomNumber ,indexLabel: "\u2193 Actual Number", markerColor: "DarkSlateGrey", markerType: "circle" },
			{ label: "End", y: 100 }
		]
	}]
	});
	chart.render();
	hintCount = 0;
	hintButton.style.display = "none";
}

function gameReset() {
        guessCount = 5;
        location.reload();
        }
			
btnSubmit.addEventListener("click", checkGuess)
resetGame.addEventListener("click", gameReset)
hintButton.addEventListener("click", hintShow)