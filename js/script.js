const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesText = document.querySelector(".remaining");
const numRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

async function getWord(){
    const retrieveWordList = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordList = await retrieveWordList.text();
    const wordArray = wordList.split("\n")
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = (wordArray[randomIndex]).trim();
    word = randomWord;
    addSymbols(word);
}

function addSymbols(word){
    let numCircles = word.length;
    let circleWord = "";
    while (numCircles > 0){
        circleWord += "●";
        numCircles --;
    }
    wordInProgress.innerText = circleWord;
}

getWord();

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
        showGuessedLetters();
        guessCount(letter);
        showCorrectGuesses(guessedLetters);
    }
    console.log(guessedLetters);  
};

function showGuessedLetters(){
    guessedLettersElement.innerHTML = "";
    for (let letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

function showCorrectGuesses(guessedLetters){
    //converts answer word to uppercase
    const wordUpper = word.toUpperCase();
    //creates an array with the letters of the answer word
    const wordArray = wordUpper.split("");

    const revealWord = [];

    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
           revealWord.push(letter); //need toUpperCase?
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("")
    didYouWin();
};

function guessCount(guess){
    let answerWord = word.toUpperCase();
    if (!answerWord.includes(guess)){
        message.innerText = `There are no ${guess}'s! Guess again!`;
        remainingGuesses --;
    } else {
        message.innerText = `Good guess! The word does have the letter ${guess}!`
    };
    if (remainingGuesses === 0){
        startOver();
        message.innerText = `Oh no! You're out of guesses. :( The word was "${word}." Better luck next time!`
    } else if (remainingGuesses === 1){
        numRemainingGuesses.innerText = "1 guess";
    } else {
        numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    };
}

function didYouWin (){
    if (wordInProgress.innerText === word.toUpperCase()){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

function startOver(){
    guessButton.classList.add("hide");
    remainingGuessesText.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");  
};

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesText.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
})