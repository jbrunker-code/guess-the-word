const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesText = document.querySelector(".remaining");
const numRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

function addSymbols(word){
    let numCircles = word.length;
    let circleWord = "";
    while (numCircles > 0){
        circleWord += "●";
        numCircles --;
    }
    wordInProgress.innerText = circleWord;
}

addSymbols(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const currentGuess = playerInput.value;
    console.log(currentGuess);
    playerInput.value = "";
})