const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesText = document.querySelector(".remaining");
const numRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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
    // empties message
    message.innerText = ""; 
    // creates variable with the current guessed letter
    const currentGuess = playerInput.value;
    //returns a letter if the guess is valid and if not updates the message
    const validatedGuess = validate(currentGuess);
    if (validatedGuess){
        //converts to uppercase, checks if guess is new, updates array of guesses
        makeGuess(validatedGuess);
    };
    //resets input window
    playerInput.value = "";

    // console.log(validatedGuess);
});

function validate(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input === ""){
        message.innerText = "Please input a single letter from a to z.";
    } else if (input.length > 1){
        message.innerText = "That's too many! Please only input a single letter from a to z."
    } else if (!input.match(acceptedLetter)){
        message.innerText = "That's not a letter! Please only input a single letter from a to z.";
    } else{
    return input;
    }
};

function makeGuess(letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){
        message.innerText = "You've already guessed that letter! Guess again!";
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters);
}