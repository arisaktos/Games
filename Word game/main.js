$(document).ready(function () {
    printunderscoredLetters();
});


$("#guessBtn").on("click", function () {
    checkLetters();
});


// used so every time a letter is entered form doesn't reload
$('#word-game-form').submit(function (e) {
    e.preventDefault();
    return false;
});

//allows for checking letters by using 'enter' key
$("#inputLetter").on('keyup', function (e) {

    if (e.keyCode == 13) {
        checkLetters();
        e.preventDefault();
    }
});


//words to guess	
var words = [
["P", "A", "N", "C", "A", "K", "E"],
  ["U", "N", "I", "C", "O", "R", "N"],
  ["P", "A", "N", "D", "A"],
  ["E", "A", "S", "T", "E", "R"]
]

//tips
var tips = [
	'Flat, delicious cake, often thin and round. Perfect for any meal.',
	'Mythical creature, upgraded version of a horse.',
	'Super clumsy bear.',
	'Like Christmas but with bunnies'
]


//randomize which word user will get
var randomWord = Math.floor(Math.random() * words.length);

//word to guess and tip needs to match
var wordToGuess = words[randomWord];
var wordTip = tips[randomWord];

//word we are guessing
var underscoredLetters = [];

//number of times user typed wrong letter
var wrongLetterCounter = 0;


//adds as many underscored letters into the array with word we are guessing, as letters in the random word
for (var i = 0; i < wordToGuess.length; i++) {
    underscoredLetters.push('_ ');
}

//reprints word we are guessing
function printunderscoredLetters() {
    $("#tipCopy").html(wordTip);
    $("#guessingBoxes").html("");
    $('#wrongLetterNum').html(wrongLetterCounter);
    
    for (var i = 0; i < wordToGuess.length; i++) {
        $("#guessingBoxes").append(underscoredLetters[i]);
    }
}


function checkLetters() {
    var allGuessed = true;

    var providedLetter = $("input[name=inputLetter]").val().toUpperCase();
    
    //checks if letter appears in the hidden word
    for (var i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === providedLetter) {
            
            //if letter is correct it's added to the array with guessing word
            underscoredLetters[i] = providedLetter + " ";
            var correctLetter = true;
        }
        
        //clears letter input box after checking
        $("input[name=inputLetter]").val("");
    }

    //reprints word with discovered letter
    printunderscoredLetters();

    if (!correctLetter) {
        var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

        //adds wrong letter to the list of wrong letters
        $("#wrongLetterBox").append(" " + providedLetter);
        
        //increases number of wrongly guessed letters
        wrongLetterCounter++;

        //changes counter of wrong letters on page
        $('#wrongLetterNum').html(wrongLetterCounter);
        
        //animation of wrong letter added to the list
        $('#wrongLetterBox').addClass('wrongLetterAnim');
        $('#wrongLetterBox').one(animationEvent, function (event) {
            $('#wrongLetterBox').removeClass('wrongLetterAnim');
        });

    }

    //checks if all letters are guessed
    for (var i = 0; i < wordToGuess.length; i++) {
        if (underscoredLetters[i] === "_ ") {
            allGuessed = false;
        }
    }
    
    //if all letters are guessed correctly
    if (allGuessed) {
        createSummary();
    }

    //if user enters 6 wrong letters they get a popup with 'sorry' message, after clicking ok page reloads
    if (wrongLetterCounter === 6) {
        alert('Sorry, you guessed wrong :(');
        location.reload()
    }
}

//if word is guessed user gets a popup with guessed world, after clicking ok page reloads
function createSummary() {
    var hiddenWord = underscoredLetters.join("").replace(/\s/g, '');
    alert('Well done! Your hidden word was ' + hiddenWord);
    location.reload()
}